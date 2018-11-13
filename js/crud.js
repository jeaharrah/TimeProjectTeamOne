document.getElementById("saveTask").onclick = function() {
            var jsonDoc = {
                "TableName": "Tasks",
                "Item": {
                    "Message": document.getElementById("Message").value,
                    "ToNumber": document.getElementById("ToNumber").value,
					"Day": document.getElementById("Day").value,
					"Year": document.getElementById("Year").value,
					"Hour": document.getElementById("Hour").value,
					"Month": document.getElementById("Month").value,
					"AM/PM": document.getElementById("AM/PM").value
				}
            };
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD",
                type: "post",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function(jsonDoc) {
                    console.info(jsonDoc);
                    alert("Task Saved!");
                }
            });
        }

        $(document).ready(function() {
            $("#getTasks").click(function() {
                $.get("https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD", function(data, status) {
                    // alert("Data: " + data + "\nStatus: " + status);
                    $("#Tasks").text(JSON.stringify(data));
                });
            });
        });

        document.getElementById("deleteTask").onclick = function() {
            var jsonDoc = {
                "TableName": "Tasks",
                "Key": {
                    "TaskID": document.getElementById("TaskID").value
                },
            };
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD",
                type: "delete",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function(jsonDoc) {
                    console.info(jsonDoc);
                    alert("Item Deleted");
                }
            });
        }

        document.getElementById("editTask").onclick = function() {
            var jsonDoc = {
                "TableName": "Tasks",
                "Key": {
                    "TaskID": document.getElementById("TaskID").value
                },
                "UpdateExpression": "set ToNumber = :a, Message = :b",
                "ExpressionAttributeValues": {
                    ":a": document.getElementById("ToNumber").value,
                    ":b": document.getElementById("Message").value
                },
                "ReturnValues": "UPDATED_NEW"
            };
            $.ajax({
                url: "https://c6tap4pp8c.execute-api.us-east-1.amazonaws.com/default/CRUD",
                type: "put",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                success: function(jsonDoc) {
                    console.info(jsonDoc);
                    alert("Task Edited!");
                }
            });
        }