<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example

This repo contains some sample AWS Lambda Functions using Serverless framework.
* Sample 1: Create S3 Bucket.
* Sample 2: Create multiple S3 Buckets.
* Sample 3: Create an object in a S3 Bucket.
* Sample 4: List the objects in a S3 Bucket.
* Sample 5: Count the number of objects in a S3 Bucket.
* Sample 6: Retrieve the information of an S3 object.
* Sample 7: Overwrite an object in a S3 Bucket.
* Sample 8: Append some text to a text file in a S3 Bucket.
* Sample 9: Delete the objects from a S3 Bucket.
* Sample 10: Delete the contents of a  S3 Bucket.
* Sample 11: Delete a S3 Bucket.
* Sample 12: List all the S3 Buckets available in an account.
* Sample 13: Duplicate an object in a S3 Bucket.
* Sample 14: Getting an item from a DynamoDB Table.
* Sample 15: Get multiple items from a DynamoDB Table.
* Sample 16: Insert an item into a DynamoDB Table.
* Sample 17: Update an item in a DynamoDB Table.
* Sample 18: Delete an item from a DynamoDB Table.
* Sample 19: Using an Amazon S3 trigger to create thumbnail images
* Sample 20: Send Email using Lambda and Simple Email Service

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```
