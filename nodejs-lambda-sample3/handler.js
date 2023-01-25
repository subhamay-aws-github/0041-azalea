"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.createS3Object = async (event) => {


  var params = {
    Bucket: event["bucket-name"],
    Key: event["object-name"],
    Body: event["object-body"]
  };

  try{
    const data = await s3.putObject(params).promise();

    return {
      statusCode: 200,
      data: data,
      event: JSON.stringify(event)
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
