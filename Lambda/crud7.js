'use strict';

var util = require('util')
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
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": "*"
		}
	});

	if (typeof event.body == 'string')
		event.body = JSON.parse(event.body);

	switch (event.httpMethod) {
		// Table name and key are in payload
		case 'GET':

			var params = {
				ExpressionAttributeValues: {
					":a": getDateString()
				},
				FilterExpression: "StampOfTime = :a",
				TableName: 'Tasks'
			};

			dynamo.scan(params, function (err, data) {
				if (err) {
					console.log("Error", err);
				} else {
					data.Items.forEach(function (element, index, array) {
						sendText("+1" + element.ToNumber, element.Message);
						deleteItemFromDB(element.StampOfTime, element.TaskID);
					});
				}
			});

			break;

		case 'POST':
			dynamo.putItem(event.body, done);
			break;

		default:
			done(new Error(`Unsupported method "${event.httpMethod}"`));


	}
};

function sendText(to, message) {
	var aws = require('aws-sdk');
	var lambda = new aws.Lambda({
		region: 'us-east-1'
	});

	console.log("$$$$$ Sending text ---" + message +
		" $$ to number " + to + " at " +
		new Date().toISOString());

	var params = {
		FunctionName: 'sendTextPy', // the lambda function we are going to invoke
		InvocationType: 'Event',
		Payload: '{"toNumber": "' + to + '", "body": "' + message + '"}'
	};

	lambda.invoke(params, function (err, data) {
		//console.log("ds");
		if (err) {
			console.log(err);
		} else {
			console.log('Success, Payload:  ' + data.Payload);
		}
	})
};

function getDateString() {
	var date = new Date();

	date.setHours(date.getHours() - 5); //Eastern Time
	return date.toISOString().substring(0, 13);
	//console.log(date); //2018-11-17T18:50:24.698Z
}

function deleteItemFromDB(StampOfTime, TaskID) {
	console.log("$$$$$ Deleting item ---" + TaskID +
		"StampOfTime" + StampOfTime);

	dynamo.deleteItem({
		"TableName": "Tasks",
		"Key": {
			"StampOfTime": StampOfTime,
			"TaskID": TaskID
		}
	}, function (err, data) {
		if (err) {
			context.fail('FAIL:  Error deleting item from dynamodb - ' + err);
		} else {
			console.log("DEBUG:  deleteItem worked. TaskID: " + TaskID +
				" timestamp: " + StampOfTime);
			//context.succeed(data);
		}
	});

}