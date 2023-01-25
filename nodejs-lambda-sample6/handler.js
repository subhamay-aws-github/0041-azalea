"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.getS3ObjectInfo = async (event) => {
  var params = {
    Bucket: event['bucket-name'],
    Key: event["key"]

  };

  try{
    const data = await s3.getObject(params).promise();
    
    return {
      statusCode: 200,
      data: {
        LastModified: data.LastModified,
        ContentLength: data.ContentLength,
        Body: data.Body.toString(),
        ContentType: data.ContentType,
        Metadata: data.Metadata
      },
      event: JSON.stringify(data)
    };
  } 
  catch (err) {
    console.log("Error");

    return {
      statusCode: 400,
      error: err.message,
      event: JSON.stringify(event)
    }
  };


};
