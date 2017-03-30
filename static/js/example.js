$(function () {
    $('#getData').click(function () {
        var changedData = 0;
        $.getJSON("/board", function (response) {
            // console.log(response)

            var content = 0
            var data = response
            console.log(data)
            for (var j in data) {

                data[j]["title"] = "JoKeR"
            };

            for (var j in data) {
                content += '<tr>';
                content += '<td id="title">' + data[j]["title"] + '</td>';
                content += '<td id="description">' + data[j]["description"] + '</td>';
                // content += '<td id="username">' + data[j]["user"]["username"] + '</td>'
                content += '<td id="date">' + data[j]["date"] + '</td>';
                content += '<td id="position">' + data[j]["position"] + '</td>'
            };

            var returnData = function (data) {
                return data
            };

            content += '</tr>';
            $('#table-content').html(content);
            changedData = data;
        });
        // console.log(changedData);

        $("#sendData").click(function () {
            console.log(changedData)
            $.ajax({
                type: "POST",
                url: "/save",
                data: {
                    "json_str":
                    JSON.stringify(changedData)
                },

                dataType: "json",
            });
        });
    });
});