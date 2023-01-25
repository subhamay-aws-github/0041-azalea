"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.createS3Bucket = async (event) => {

  const bucket_name = event["bucket-name"];

  console.log(`Bucket Name : ${bucket_name}`);
  var params = {
    Bucket: bucket_name,
    // CreateBucketConfiguration: {
    //   LocationConstraint: 'us-east-1'
    // },
    ACL: "private",
  };

  try{
    const data = await s3.createBucket(params).promise();
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
