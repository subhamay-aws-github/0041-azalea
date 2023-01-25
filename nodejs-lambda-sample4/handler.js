"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.listS3Objects = async (event) => {

  try{
    const data = await s3.listObjectsV2({
        Bucket: event["bucket-name"]
    }).promise();

    let counter = 0
    let objectNames = data.Contents.map(async (content) => {

      let objectName = content.Key;
      let storageClass = content.StorageClass;
      counter++;
      console.log(`${counter} - File Name: ${objectName} , StorageClass: ${storageClass}`);

    });

    await Promise.all(objectNames);

    return {
      statusCode: 200,
      data: "List of Objects Fetched.",
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
