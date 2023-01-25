"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.duplicateAnObjectInS3Bucket = async (event) => {
  try {
    const data = await s3
      .getObject({
        Bucket: event["bucket-name"],
        Key: event["object-name"],
      })
      .promise();

    let existingObject = data.Body;

    try {
      const data = await s3
        .putObject({
          Bucket: event["bucket-name"],
          Key: "copy_of_" + event["object-name"],
          Body: existingObject
        })
        .promise();

      let protocol = "s3://"
      console.log(`Created a copy of the object ${protocol}${event["bucket-name"]}/${event["object-name"]}`);

      return {
        statusCode: 200,
        data: `Created a copy of the object ${protocol}${event["bucket-name"]}/${event["object-name"]}`
      }
    } catch (err) {
      console.error("Error in calling s3.putObject");
    }
  } catch (err) {
    console.error("Error in calling s3.getObject");

    return {
      statusCode: 400,
      error: err.message,
      event: JSON.stringify(event),
    };
  }
};