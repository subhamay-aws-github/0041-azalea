const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const util = require("./util.js");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.PRODUCT_CATALOG_TABLE;

module.exports.getDynamoDBItem = async (event) => {
  try {
    let id = event.Id;
    let params = {
      TableName: tableName,
      KeyConditionExpression: "Id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
      Limit: 1
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
