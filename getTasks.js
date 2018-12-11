

var API = "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks&type=getTable";
var JSONObject = {}

function setup() {
	payload = JSON.parse(sessionStorage.getItem("payload"));
	var counter = 1;

	for (var i = 0; i < payload.Items.length; i++) {
		
		var TaskID = payload.Items[i].TaskID;
		var Message = payload.Items[i].Message;
		var ToNumber = payload.Items[i].ToNumber;
		var StampOfTime = payload.Items[i].StampOfTime;

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${TaskID}</td>
                <td>${Message}</td>
                <td>${ToNumber}</td>
                <td>${StampOfTime}</td>
            </tr>
		`;

		// Append to table
		$('#salesTable').append(tableRow);
		counter += 1;
	}

}
function saveTask()
{
	if(document.getElementById("TaskID").value == "" || document.getElementById("Message").value == "" ||
			document.getElementById("ToNumber").value == "" || document.getElementById("StampOfTime").value == "")
			{
				alert("Please input all fields.");
				return;
			}
	var jsonDoc = {
                "TableName": "Tasks",
                "Item": {
					
                    "TaskID": document.getElementById("TaskID").value,
                    "Message": document.getElementById("Message").value,
                    "ToNumber": document.getElementById("ToNumber").value,
					"StampOfTime": document.getElementById("StampOfTime").value
                }
            };
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks",
                type: "POST",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function(jsonDoc) {
                    console.info(jsonDoc);
                    alert("Task Saved!");
                }
            });
}
 function search() {
	grab();
	//setup();
	var myNode = document.getElementById("tasksTable");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	
	var counter = 1;
	var TaskID = document.getElementById("TaskID").value;
	var Messase = document.getElementById("Message").value;
	var ToNumber = document.getElementById("ToNumber").value;
	var StampOfTime = document.getElementById("StampOfTime").value;
	

	payload = JSON.parse(sessionStorage.getItem("payload"));
	payloadRefined = {
		"Items": []
	};
	var add = true;

	for(var i = 0; i < payload.Items.length; i++) {
		add = true;

		var TaskID = document.getElementById("TaskID").value;
	    var Messase = document.getElementById("Message").value;
	    var ToNumber = document.getElementById("ToNumber").value;
	    var StampOfTime = document.getElementById("StampOfTime").value;
		
		
/* 		if(TaskID != "" && !String(payload.Items[i].Sales_Order_Number).includes(orderNum)) {
			add = false;
		}

		if(Message != "" && !String(fullName[0]).includes(firstName)) {
			add = false;
		}

		if(ToNumber != "" && !String(fullName[1]).includes(lastName)) {
			add = false;
		}

		if(StampOfTime != "" && !String(payloadShippingAddress).includes(shippingAddress)) {
			add = false;
		} */

		if(add) {
			payloadRefined.Items.push((payload.Items[i]));
		}
	}

	console.log(payloadRefined);

	// Remove all elements of the current table
	var myNode = document.getElementById("tasksTable");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	for (var i = 0; i < payloadRefined.Items.length; i++) {
		var TaskID = payloadRefined.Items[i].TaskID;

		var Message = payloadRefined.Items[i].Message;
		var ToNumber = payloadRefined.Items[i].ToNumber;
		var StampOfTime = payloadRefined.Items[i].StampOfTime;

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${TaskID}</td>
                <td>${Message}</td>
                <td>${ToNumber}</td>
                <td>${StampOfTime}</td>
            </tr>
		`;

		// Append to table
		$('#tasksTable').append(tableRow);
		counter += 1;
	}
	//grab();


}

//get the payload
function grab() {
	try {
		$.getJSON(API, JSONObject)
			.done(function (json) {
				sessionStorage.setItem("payload", JSON.stringify(json));
				setup();
			});
	} catch (err) {
		console.log(err);
	}
}

function getATask()
{
	if(document.getElementById("TaskID").value =="")
	{
		alert("Please enter a Task ID");
		return;
	}
		grabSingle(document.getElementById("TaskID").value)
}

function grabSingle(TaskID) {
	API = "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks&type=admin&attributeName=TaskID&attributeValue=" + TaskID;
	try {
		$.getJSON(API, JSONObject)
			.done(function (json) {
				sessionStorage.setItem("payload", JSON.stringify(json));
				//grab();
				search();
			});
	} catch (err) {
		console.log(err);
	}
}

function postATask()
{
	var jsonDoc = {
                "TableName": "Tasks",
                "Item": {
					
                    "TaskID": document.getElementById("TaskID").value,
                    "Message": document.getElementById("Message").value,
                    "ToNumber": document.getElementById("ToNumber").value,
					"StampOfTime": document.getElementById("StampOfTime").value
                }
            };
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks",
                type: "POST",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function(jsonDoc) {
                    console.info(jsonDoc);
                    alert("Task Saved!");
                }
            }); 
}

function editTask()
{
	var fieldToEdit;
	var taskID = document.getElementById("TaskID").value;
	var message = document.getElementById("Message").value;
	var toNumber = document.getElementById("ToNumber").value;
    var stampOfTime = document.getElementById("StampOfTime").value;
	
	if( taskID == "")
	{
		alert("Please enter a Task ID");
		return;
	}
	count = 0;
	if(message == "")
	{
		count++;
		fieldToEdit = "message";
	}
	if(toNumber == "")
	{
		count++;
		fieldToEdit = "toNumber";
	}
	if(stampOfTime == "")
	{
		count++;
		fieldToEdit = "stampOfTime";
	}
	
	if(count <= 1)
	{
		alert("Please enter only one field to edit");
		return;
	}
	if(count > 2)
	{
		alert("Please enter a field to edit");
		return;
	}
	
	if(fieldToEdit == "stampOfTime")
	{
            var jsonDoc = {
                "TableName": "Tasks",
                "Key": {
                    "TaskID": document.getElementById("TaskID").value
                },
                "UpdateExpression": "set StampOfTime = :a",
                "ExpressionAttributeValues": {
                    ":a": document.getElementById("StampOfTime").value
                },
                "ReturnValues": "UPDATED_NEW"
            };
	}
	else if(fieldToEdit == "toNumber")
	{
		var jsonDoc = {
                "TableName": "Tasks",
                "Key": {
                    "TaskID": document.getElementById("TaskID").value
                },
                "UpdateExpression": "set ToNumber = :a",
                "ExpressionAttributeValues": {
                    ":a": document.getElementById("ToNumber").value
                },
                "ReturnValues": "UPDATED_NEW"
            };
	}
	else if(fieldToEdit == "Message")
	{
		var jsonDoc = {
                "TableName": "Tasks",
                "Key": {
                    "TaskID": document.getElementById("TaskID").value
                },
                "UpdateExpression": "set Message = :a",
                "ExpressionAttributeValues": {
                    ":a": document.getElementById("Message").value
                },
                "ReturnValues": "UPDATED_NEW"
            };
	}
			
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks",
                type: "put",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function (jsonDoc) {
                    console.info(jsonDoc);
                    alert("Task Edited!");
                }
            });
        
}

function getTasks()
{
	$("#getTasks").click(function() {
                $.get("https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks&type=getTable", function(data, status) {
                    // alert("Data: " + data + "\nStatus: " + status);
                    $("#Tasks").text(JSON.stringify(data));
                });
            });
}

function deleteTask() 
{
	console.log(document.getElementById("TaskID").value);
	if(document.getElementById("TaskID").value == "")
	{
		alert("Please enter a Task ID");
		return;
	}
		var jsonDoc = {
			"TableName": "Tasks",
			"Key": {
				"TaskID": document.getElementById("TaskID").value
			},
		};
		$.ajax({
			url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD?TableName=Tasks",
			type: "delete",
			data: JSON.stringify(jsonDoc),
			dataType: "json",
			success: function(jsonDoc) {
				console.info(jsonDoc);
				alert("Item Deleted");
			}
		});
	}

window.onload = grab();

