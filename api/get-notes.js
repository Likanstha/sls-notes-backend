/**
 * Route: GET /node
 */

 const AWS = require('aws-sdk');
 AWS.config.update({ region: 'ap-southeast-2' });
 
 const util = require("./util.js");
 
 const dynamodb = new AWS.DynamoDB.DocumentClient();
 const tableName = process.env.NOTES_TABLE;
 
 
 
 exports.handler = async (event) => {
     try {
        let query = event.queryStringParameters;
        let limit = query && query.limit ? parseInt(query.limit) : 5;

        // Corrected: Initialize 'user_id'
        let user_id = util.getUserId(event.headers);

        let params = {
            TableName: tableName,
            KeyConditionExpression: "user_id = :uid", // Corrected typo in 'KeyConditionExpression'
            ExpressionAttributeValues: {
                ":uid": user_id // Corrected variable name from 'user_id' to 'user_id'
            },
            Limit: limit, // Corrected 'limit' to 'Limit'
            ScanIndexForward: false
        };
         
         

        let startTimestamp = query && query.start ? parseInt(query.start) : 0;

        if (startTimestamp > 0) {
            // Corrected: 'ExclisiveStartKey' to 'ExclusiveStartKey'
            params.ExclusiveStartKey = {
                user_id: user_id,
                timestamp: startTimestamp
            };
        }
         
        console.log("DynamoDB Query Params:", params);
        let data = await dynamodb.query(params).promise();
        console.log("DynamoDB Query Result:", data);
         
         
         
         return {
             statusCode: 200,
             headers: util.getResponseHeaders(),
             body: JSON.stringify(data)
             }
 
 
     } catch (err) {
         
         console.log("Error", err)
         return {
             statusCode: err.statusCode ? err.statusCode : 500,
             headers: util.getResponseHeaders(),
             body: JSON.stringify({
                     error: err.name ? err.name : 'Exception',
                     message:err.message?err.message:"Unknown error"
                 
             })
         }
     }
 }