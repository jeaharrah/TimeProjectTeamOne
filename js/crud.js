

document.getElementById("saveTask").onclick = function() {
	
/* document.getElementById("Message").value =  document.getElementById("Hour").value;	
return; */

var year = document.getElementById("Year").value;
var month = document.getElementById("Month").value;
var day = document.getElementById("Day").value;
var hour = document.getElementById("Hour").value;
var ampm = document.getElementById("AM/PM").value;

if(year == "" || month == "" || day == "")
{
	alert("Please fill out all feilds");
	return;
}

if(hour == "Select an Hour")
{
	alert("please enter an hour.")
	return;
}
if(ampm != "pm" && ampm != "am")
{
	alert("please enter AM/PM.")
	return;
}

switch(month)
{
	case 'January': month = "01"; break;
	case 'February': month = "02"; break;
	case 'March': month = "03"; break;
	case 'April': month = "04"; break;
	case 'May': month = "05"; break;
	case 'June': month = "06"; break;
	case 'July': month = "07"; break;
	case 'August': month = "08"; break;
	case 'September': month = "09"; break;
	case 'October': month = "10"; break;
	case 'November': month = "11"; break;
	case 'December': month = "12";
}

switch(day) //ISO format needs 0
{
	case '1': day = "01"; break;
	case '2': day = "02"; break;
	case '3': day = "03"; break;
	case '4': day = "04"; break;
	case '5': day = "05"; break;
	case '6': day = "06"; break;
	case '7': day = "07"; break;
	case '8': day = "08"; break;
	case '9': day = "09";
}

switch(hour)//ISO format needs 0
{
	case '1': hour = "01"; break;
	case '2': hour = "02"; break;
	case '3': hour = "03"; break;
	case '4': hour = "04"; break;
	case '5': hour = "05"; break;
	case '6': hour = "06"; break;
	case '7': hour = "07"; break;
	case '8': hour = "08"; break;
	case '9': hour = "09";
}

if(ampm == "pm")
	hour = (parseInt(hour)+12).toString();


var timeStamp = year + "-" + month + "-" + day;
				
				if(!moment(timeStamp).isValid())
				{
					alert("Please enter a valid date.");
					return;
				}
				
				
				if(moment(timeStamp).isBefore()) // Before now
				{
					alert("Please enter a time in the future.");
					return;
				}
				
				if(moment(timeStamp).isAfter("2049-12-31")) 
				{
					alert("Please enter a date before the year 2050.");
					return;
				}
				
				timeStamp += "T" + hour;
	
	
	
            var jsonDoc = {
                "TableName": "Tasks",
                "Item": {
					"TaskID": randomString(),
                    "Message": document.getElementById("Message").value,
                    "ToNumber": document.getElementById("ToNumber").value,
					"TimeStamp": timeStamp
					/* "Day": document.getElementById("Day").value,
					"Year": document.getElementById("Year").value,
					"Hour": document.getElementById("Hour").value,
					"Month": document.getElementById("Month").value,
					"AM/PM": document.getElementById("AM/PM").value */
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
		
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 12;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}