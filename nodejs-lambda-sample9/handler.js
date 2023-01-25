"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.deletingObjectsFromS3Bucket = async (event) => {
  const fileList = event["object-names"];

  let params = {};
  params["Bucket"] = event["bucket-name"];
  params["Delete"] = {};
  params["Delete"]["Objects"] = [];

  fileList.map(async (element) => {
    params["Delete"]["Objects"].push({ Key: element });
  });

  console.log(params);

  try{
    const data = await s3.deleteObjects(params).promise();
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
