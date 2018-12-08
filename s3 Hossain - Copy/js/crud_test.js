

function checkCount(){
	
	$.get("https://vr3v4bjgm1.execute-api.us-east-1.amazonaws.com/default/CheckPhoneNumber?attributeValue=" + document.getElementById("ToNumber").value, 
					function(data, status) {
                    alert("Number Of Entries: " + data.Count);
                    //$("#Tasks").text(JSON.stringify(data));
                });
}