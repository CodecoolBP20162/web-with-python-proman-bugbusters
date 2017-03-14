// var dateConverting = function (time) {
//     console.log(time.getTime());
//     return time.getTime();

// };

var generateData = function () {
    // Check browser support
    if (checkStorage) {
        // Create dictionary
        var boards = {};
        boards.board1 = { title: "Board #1", description: "First board", timestamp: Date.now(), cards: [] };
        boards.board1.cards = [{}, {}, {}];
        boards.board1.cards[0] = { title: "First card", status: "New", elements: [1, 2, 3], modified: Date.now() };
        boards.board1.cards[1] = { title: "Second card", status: "New", elements: [4, 5, 6], modified: Date.now() }
        boards.board1.cards[2] = { title: "Third card", status: "New", elements: [7, 8, 9], modified: Date.now() }

        boards.board2 = { title: "Board #2", description: "Second board", timestamp: Date.now(), cards: [] };
        boards.board2.cards = [{}, {}, {}];
        boards.board2.cards[0] = { title: "First card", status: "New", elements: [1, 2, 3], modified: Date.now() };
        boards.board2.cards[1] = { title: "Second card", status: "New", elements: [4, 5, 6], modified: Date.now() }
        boards.board2.cards[2] = { title: "Third card", status: "New", elements: [7, 8, 9], modified: Date.now() }
        // Store
        // Convert to JSON file and save to storage
        localStorage.boards = JSON.stringify(boards);
    };
};

var retrieveData = function (data) {
    // Retrieve and convert to dictionary
    if (checkStorage) {
        return JSON.parse(localStorage.getItem(data));
    } else {
        return {}
    };

};

var checkStorage = function () {
    if (typeof (Storage) !== "undefined") {
        return True;
    } else {
        return False;
    };

};

var getBoards = function(data) {
    var allBoards = retrieveData(data);
    var boards = []
    for (var i in allBoards) {
      var div = document.createElement("div");
      div.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12";
      div.className = " 'project project-grey draggable' draggable='true' data-toggle='modal' data-target='.board-modal'";
      var h3 = document.createElement("h3");
      var text = document.createTextNode(allBoards[i].title);
      h3.appendChild(text);
      div.appendChild(h3);

        document.getElementById("result").appendChild(div);

  };

};




generateData();
var boards = retrieveData("boards");
getBoards("boards");
//document.getElementById("result").outerHTML = boards.board1.cards[0].modified;