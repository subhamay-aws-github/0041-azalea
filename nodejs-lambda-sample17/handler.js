const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const util = require("./util.js");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.REPLY_TABLE;

module.exports.updateDynamoDBItem = async (event) => {
  try {

    let params = {
      TableName: tableName,
      Key: {
        Id: event.Id,
        ReplyDateTime: event.ReplyDateTime
      },
      ExpressionAttributesNames: {
        "#Message_Text": "Message"
      },
      ExpressionAttributeValues: {
        ":Message": event.Message
      },
      UpdateExpression: "SET Message = :Message",
      ReturnValues: "ALL_NEW"
    };

    let data = await dynamodb.update(params).promise();

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
