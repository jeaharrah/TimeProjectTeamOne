$(document).ready(function () {

var json = {

    "205100": {
        "success": true,
            "data": {
            "type": "game",
                "name": "MasterKin",
                "steam_appid": 9000,
                "required_age": 40,
                "is_free": false,
                "controller_support": "full",
                "dlc": [212894, 212893, 208575, 208570]
        }
    }

};

var game_name = [];
for (var key in json) {
    if (json.hasOwnProperty(key)) {
        var item = json[key];
        game_name.push({
            ItemName: item.data.name //Changing the .name to .dlc or .type will then display that result

        });
    }
}
console.log(game_name);
var tr;
for (var i = 0; i < game_name.length; i++) {
    tr = $('<tr/>');
    tr.append("<td>" + game_name[i].ItemName + "</td>");

    $('table').append(tr);
}
});