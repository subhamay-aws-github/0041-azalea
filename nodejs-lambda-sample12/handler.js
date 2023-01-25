"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.listS3Buckets = async (event) => {
  try {
    const data = await s3.listBuckets().promise();

    let bucketList = [];
    let counter = 0;
    let bucketNames = data.Buckets.map(async (content) => {
      let bucketName = content.Name;
      bucketList.push(bucketName);
      counter++;
      console.log(
        `${counter} -  ${bucketName}`
      );
    });

    await Promise.all(bucketNames);
    return {
      statusCode: 200,
      data: bucketList,
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
};
