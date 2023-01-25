"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.countObjectsInS3Bucket = async (event) => {

  try{
    const data = await s3.listObjectsV2({
        Bucket: event["bucket-name"]
    }).promise();

    return {
      statusCode: 200,
      data: `Object Count = ${data.KeyCount}`,
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
