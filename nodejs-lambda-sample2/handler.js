"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.createS3Buckets = async (event) => {
  console.log("Create S3 Buckets");

  let bucketsToCreate = event.Records.map(async (record) => {
    let bucketName = record.s3.bucket;

    console.log(`Bucket to create : ${bucketName}`);

    try {
      var params = {
        Bucket: bucketName,
        ACL: "private",
      };

      const data = await s3.createBucket(params).promise();

      console.log(`Bucket ${data.Location.split("/")[1]} created successfully !`);

    } catch (err) {
      console.log("Error");

      return {
        statusCode: 400,
        error: err.message,
        event: JSON.stringify(event),
      };
    }
  });

  await Promise.all(bucketsToCreate);
  console.log("Buckets creation complete");
  return {
    statusCode: 200,
    data: "Buckets creation complete",
    event: JSON.stringify(event)
  };
};
