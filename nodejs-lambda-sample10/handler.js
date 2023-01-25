"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.deleteAllObjectsFromS3Bucket = async (event) => {
  // Get the list of S3 objects from the bucket
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: event["bucket-name"],
      })
      .promise();

    // console.log(data);
    let counter = 0;
    let fileList = [];
    let objectNames = data.Contents.map(async (content) => {
      let objectName = content.Key;
      let storageClass = content.StorageClass;
      counter++;
      console.log(
        `${counter} - File Name: ${objectName} , StorageClass: ${storageClass}`
      );
      fileList.push(objectName);
    });

    await Promise.all(objectNames);

    console.log(`List of objects available in the bucket : ${fileList}`);

    // Delete all the files from the S3 Bucket
    let params = {};
    params["Bucket"] = event["bucket-name"];
    params["Delete"] = {};
    params["Delete"]["Objects"] = [];

    fileList.map(async (element) => {
      params["Delete"]["Objects"].push({ Key: element });
    });

    // console.log(params);

    try {
      const data = await s3.deleteObjects(params).promise();
      return {
        statusCode: 200,
        data: data,
        event: JSON.stringify(event),
      };
    } catch (err) {
      console.log("Error");

      return {
        statusCode: 400,
        error: err.message,
        event: JSON.stringify(event),
      };
    }
  } catch (err) {
    console.log("Error");

    return {
      statusCode: 400,
      error: err.message,
      event: JSON.stringify(event),
    };
  }
};
