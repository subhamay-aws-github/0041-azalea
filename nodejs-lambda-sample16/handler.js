const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const util = require("./util.js");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.REPLY_TABLE;

module.exports.putDynamoDBItem = async (event) => {
  try {
    const Id = event["Id"];
    const ReplyDateTime = event["ReplyDateTime"];
    const Message = event["Message"];
    const PostedBy = event["PostedBy"];

    const item = {
      Id,
      ReplyDateTime,
      Message,
      PostedBy,
    };

    let data = await dynamodb
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(item),
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
