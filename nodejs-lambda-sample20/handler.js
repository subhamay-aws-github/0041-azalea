"use strict";
const AWS = require("aws-sdk");
const util = require("./util.js");
const ses = new AWS.SES();

module.exports.sendEmailUsingSES = async (event, context) => {
  console.log("Received:::", event);
  const { to, from, subject, message } = JSON.parse(event.body);

  if (!to || !from || !subject || !message) {
    return {
      statusCode: 400,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({ message: " to or from... are not set properly!" }),
    };
  }
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };
  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        message: "email sent successfully!",
        success: true,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        message: "The email failed to send",
        success: true,
      }),
    };
  }
};
