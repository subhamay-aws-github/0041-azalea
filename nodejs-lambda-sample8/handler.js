"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({});

module.exports.appendingToAnObjectInS3 = async (event) => {
  try {
    const data = await s3
      .getObject({
        Bucket: event["bucket-name"],
        Key: event["object-name"],
      })
      .promise();

    let existingText = data.Body.toString();

    try {
      const data = await s3
        .putObject({
          Bucket: event["bucket-name"],
          Key: event["object-name"],
          Body: existingText + "\n" + event["object-body"]
        })
        .promise();

      let protocol = "s3://"
      console.log(`New text appended to the object ${protocol}${event["bucket-name"]}/${event["object-name"]}`);

      return {
        statusCode: 200,
        data: `New text appended to the object ${protocol}${event["bucket-name"]}/${event["object-name"]}`
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
