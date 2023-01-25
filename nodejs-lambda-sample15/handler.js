const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const util = require("./util.js");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.REPLY_TABLE;

module.exports.getDynamoDBItems = async (event) => {
  try {
    let id = event.Id;
    let replyDateTime = event.ReplyDateTime;
    let limit = event.Limit ? parseInt(event.Limit) : 5;
    let params = {
      TableName: tableName,
      KeyConditionExpression: "Id = :id AND ReplyDateTime = :replyDateTime",
      ExpressionAttributeValues: {
        ":id": id,
        ":replyDateTime": replyDateTime
      },
      Limit: limit,
      ScanIndexForward: false
    };

    let data = await dynamodb.query(params).promise();

    if (!_.isEmpty(data.Items)) {
      return {
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: data.Items[0]
      };
    } else {
      return {
        statusCode: 404,
        headers: util.getResponseHeaders(),
        body: null
      };
    }
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
