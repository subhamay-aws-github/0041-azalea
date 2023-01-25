"use strict";
// const fs = require("fs");
const Jimp = require("jimp");
const util = require("util");
const AWS = require("aws-sdk");
// get reference to S3 client
const s3 = new AWS.S3();

module.exports.resizeImage = async (event) => {
  console.log("Event : ", JSON.stringify(event));

  // Read options from the event parameter.
  console.log(
    "Reading options from event:\n",
    util.inspect(event, { depth: 5 })
  );
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const dstBucket = process.env.DESTINATION_S3_BUCKET;
  const dstKey = srcKey.split(".")[0] + "-thumbnail." + srcKey.split(".")[1];
  console.log(`Source Bucket : ${srcBucket}`);
  console.log(`Source Object Key : ${srcKey}`);
  console.log(`Destination Bucket : ${dstBucket}`);
  console.log(`Destination Object Key : ${dstKey}`);

  // // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("Could not determine the image type.");
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  console.log(`Image Type : ${imageType}`);
  if (imageType != "jpg" && imageType != "png") {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  } else {
    console.log(`Image type: ${imageType} is supported.`);
  }

  // Generate Signed URL
  const viewUrl = await s3.getSignedUrl("getObject", {
    Bucket: srcBucket,
    Key: srcKey,
    Expires: 600,
  });

  // Use the Jimp module to resize the image and save in a buffer.
  try {
    const myimage = await Jimp.read(viewUrl);
    var bufferData = await myimage
      .cover(50, 50)
      .quality(60)
      .getBufferAsync("image/png");
  } catch (error) {
    console.log(error);
    return;
  }

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: bufferData,
      ContentType: "image/" + imageType,
    };
    var putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(
    `Successfully resized ${srcBucket}/${srcKey} and uploaded to ${dstBucket}/${dstKey}`
  );

  return {
    statusCode: 200,
    data: JSON.stringify(putResult),
    message: `Successfully resized ${srcBucket}/${srcKey} and uploaded to ${dstBucket}/${dstKey}`,
  };
};
