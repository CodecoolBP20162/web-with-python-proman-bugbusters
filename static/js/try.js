$(function () {
    $('button').click(function () {
        var changedData = 0
        $.getJSON("/user", function (response) {
            // console.log(response)

            var content = 0
            var data = response
            for (var j in data) {

                data[j]["title"] = "JoKeR"
            };

            for (var j in data) {
                content += '<tr>';
                content += '<td id="title">' + data[j]["title"] + '</td>';
                content += '<td id="description">' + data[j]["description"] + '</td>';
                content += '<td id="username">' + data[j]["user"]["username"] + '</td>'
                content += '<td id="date">' + data[j]["date"] + '</td>';
                content += '<td id="position">' + data[j]["position"] + '</td>'
            };

            changedData = data
            content += '</tr>';
            $('#table-content').html(content);
        });
        // console.log(changedData)
        $("#sendData").click(function () {
            // event.preventDefault();
            // $.ajax({
            //     url: '/save',
            //     type: 'POST',
            //     data: changedData,
            //     dataType: 'json',
            //     success: function () {
            //         console.log("siker", data);
            //     },
            //     error: function (error) {
            //         console.log(data);
            //     }
            // });
            $.ajax({
                type: "POST",
                url: "/save",
                data: JSON.stringify([{
                    'board': {
                        'title': $("#title").val(),
                        'description': $("#description").val(),
                        'user': $("#user").val(),
                        'date': $("#date").val(),
                        'position': $("#position").val()
                    }
                }]),
                dataType: "json",
            });
        });
    });

});