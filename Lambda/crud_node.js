'use strict';

console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

// All the request info in event
// "handler" is defined on the function creation
exports.handler = (event, context, callback) => {

    // Callback to finish response
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"
        }
    });
    
if (typeof event.body == 'string')
        event.body = JSON.parse(event.body);
        
    switch (event.httpMethod) {
        // Table name and key are in payload
        case 'GET':
            var params = {
                ExpressionAttributeValues: {
                ":a": event.queryStringParameters.id },
                FilterExpression: "StampOfTime = :a",
                TableName:'Tasks'};
            //dynamo.scan(params,done);
            console.log("******" + dynamo.scan(params,done));
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};