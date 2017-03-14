// var dateConverting = function (time) {
//     console.log(time.getTime());
//     return time.getTime();

// };

var checkStorage = function () {
    if (typeof (Storage) !== "undefined") {
        return True;
    } else {
        return False;
    }
};

var generateData = function () {
        // Create dictionary
        var boards = {};
        boards.board1 = { title: "Board #1", description: "First board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board1.cards = [{}, {}, {}];
        boards.board1.cards[0] = { title: "First card", status: "New", elements: [1, 2, 3], modified: new Date().toLocaleString() };
        boards.board1.cards[1] = { title: "Second card", status: "New", elements: [4, 5, 6], modified: new Date().toLocaleString() };
        boards.board1.cards[2] = { title: "Third card", status: "New", elements: [7, 8, 9], modified: new Date().toLocaleString() };

        boards.board2 = { title: "Board #2", description: "Second board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board2.cards = [{}, {}, {}];
        boards.board2.cards[0] = { title: "First card", status: "New", elements: [1, 2, 3], modified: new Date().toLocaleString() };
        boards.board2.cards[1] = { title: "Second card", status: "New", elements: [4, 5, 6], modified: new Date().toLocaleString() };
        boards.board2.cards[2] = { title: "Third card", status: "New", elements: [7, 8, 9], modified: new Date().toLocaleString() };
        // Store
        // Convert to JSON file and save to storage
        localStorage.boards = JSON.stringify(boards);
};

var checkStorage = function () {
    if (typeof (Storage) !== "undefined") {
        return True;
    } else {
        return False;
    }
};

var retrieveData = function (data) {
    return JSON.parse(localStorage.getItem(data));
};

var getBoards = function(data) {
    var allBoards = retrieveData(data);
    for (var i in allBoards) {
        var projectContent = createProjectContent(allBoards[i]);
        var ediv = decorateContext("project project-grey draggable draggable='true' data-toggle='modal' data-target='.board-modal'", projectContent);
        var div = decorateContext("col-lg-3 col-md-4 col-sm-6 col-xs-12", ediv);
        document.getElementById("result").appendChild(div);
  }
};

var createProjectContent = function (board) {
    var projectContent = document.createElement("div");
    projectContent.className = "project-content";
    var h3 = document.createElement("h3");
    var text = document.createTextNode(board.title);
    h3.className = "lead";
    h3.appendChild(text);
    var p = document.createElement("p");
    var description = document.createTextNode(board.description);
    var time = decorateContext("time", document.createTextNode(board.timestamp));
    var cards = decorateContext("cards", document.createTextNode(board.cards.length));
    p.appendChild(description);
    projectContent.appendChild(h3);
    projectContent.appendChild(p);
    projectContent.appendChild(time);
    projectContent.appendChild(cards);
    return  projectContent;
};

var decorateContext = function(name, context) {
    var div = document.createElement("div");
    div.className = name;
    div.appendChild(context);
    return div
};

var getCards = function(cards) {
    for (var i in cards){
        
    }
};


generateData();
var boards = retrieveData("boards");
getBoards("boards");
//document.getElementById("result").outerHTML = boards.board1.cards[0].modified;