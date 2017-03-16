var generateData = function () {
        // Create dictionary
        var boards = {};
        boards.board1 = { title: "Board #1", description: "First board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board1.cards = [{}, {}, {}];
        boards.board1.cards[0] = { title: "First card", status: "new", elements: [1, 2, 3, 10], modified: new Date().toLocaleString() };
        boards.board1.cards[1] = { title: "Second card", status: "new", elements: [4, 5, 6], modified: new Date().toLocaleString() };
        boards.board1.cards[2] = { title: "Third card", status: "new", elements: [7, 8, 9], modified: new Date().toLocaleString() };

        boards.board2 = { title: "Board #2", description: "Second board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board2.cards = [{}, {}, {}];
        boards.board2.cards[0] = { title: "First card", status: "new", elements: [1, 2, 3, 20], modified: new Date().toLocaleString() };
        boards.board2.cards[1] = { title: "Second card", status: "new", elements: [4, 5, 6], modified: new Date().toLocaleString() };
        boards.board2.cards[2] = { title: "Third card", status: "new", elements: [7, 8, 9], modified: new Date().toLocaleString() };

        boards.board3 = { title: "Board #3", description: "Second board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board3.cards = [{}, {}, {}];
        boards.board3.cards[0] = { title: "First card", status: "new", elements: [1, 2, 3, 20], modified: new Date().toLocaleString() };
        boards.board3.cards[1] = { title: "Second card", status: "new", elements: [4, 5, 6], modified: new Date().toLocaleString() };
        boards.board3.cards[2] = { title: "Third card", status: "new", elements: [7, 8, 9], modified: new Date().toLocaleString() };
        boards.board3.cards[3] = { title: "#4 card", status: "new", elements: [7, 8, 9], modified: new Date().toLocaleString() };
        boards.board3.cards[4] = { title: "#5 card", status: "new", elements: [7, 8, 9], modified: new Date().toLocaleString() };

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


var generetaEmptyBoard = function () {
    var inputDiv = document.createElement('div');
    inputDiv = decorateContext("portfolio-overlay portfolio-item", inputDiv);
    var form = document.createElement("form");
    var title = document.createElement("input");
    title.setAttribute("id", "title");
    title.setAttribute("type", "text");
    title.setAttribute("min", 7);
    title.setAttribute("max", 20);
    title.setAttribute('required', 'true');
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    description.setAttribute("min", 14);
    description.setAttribute("max", 50);
    description.setAttribute('required', 'true');
    var form_button = document.createElement('button');
    form_button.setAttribute("onclick", "addNewBoard();");
    form_button.appendChild(document.createTextNode('Submit'));
    form.appendChild(title);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(description);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(form_button);
    form = decorateContext("portfolio-overlay portfolio-item", form);
    inputDiv.appendChild(form);
    inputDiv = decorateContext("overlay portfolio-picture", inputDiv);
    inputDiv = decorateContext("portfolio-thumb new-card portfolio-picture", inputDiv);
    inputDiv = decorateContext("item iso-box col-lg-3 col-md-4 col-sm-6 col-xs-12", inputDiv);
    document.getElementById("board-holder").appendChild(inputDiv);
};


var getBoards = function(data) {
    var allBoards = retrieveData(data);
    var j = 1;
    generetaEmptyBoard();
    for (var i in allBoards) {
        var projectContent = createProjectContent(allBoards[i]);
        var ediv = decorateContext("portfolio-thumb draggable", projectContent);
        ediv.setAttribute('draggable', 'true');
        var div = decorateContext("item iso-box col-lg-3 col-md-4 col-sm-6 col-xs-12", ediv);
        var count = "board"+j.toString();
        var adiv = decorateContext(count, div);
        document.getElementById("board-holder").appendChild(adiv);
        getCards(allBoards[i].cards, count);
        j += 1;
  }
};

var createProjectContent = function (board) {
    var projectContent = document.createElement("div");
    projectContent.className = "overlay portfolio-picture board";
    var h3 = document.createElement("h3");
    var text = document.createTextNode(board.title);
    h3.className = "lead";
    h3.appendChild(text);
    var p = document.createElement("p");
    var description = document.createTextNode(board.description);
    p.appendChild(description);
    var hover = document.createElement("div");
    hover = decorateContext("portfolio-overlay portfolio-item", hover);
    var time = document.createElement("h2");
    time.appendChild(document.createTextNode(board.timestamp));
    var cards = document.createElement("h2");
    cards.appendChild(document.createTextNode(board.cards.length));
    projectContent.appendChild(h3);
    projectContent.appendChild(p);
    hover.appendChild(cards);
    hover.appendChild(time);
    projectContent.appendChild(hover);
    return  projectContent;
};

var decorateContext = function(name, context) {
    var projectContent = document.createElement("div");
    projectContent.className = "project-content";
    var div = document.createElement("div");
    div.className = name;
    div.appendChild(context);
    return div;
};

var getCards = function(cards, boardnum) {
    for (var card in cards){
        var projectContent = document.createElement("div");
        projectContent.className = "project-content";
        var h3 = document.createElement("h3");
        var text = document.createTextNode(cards[card].title);
        h3.className = "lead";
        h3.appendChild(text);
        var p = getCardElements(cards[card].elements);
        projectContent.appendChild(h3);
        projectContent.appendChild(p);
        var color = ("project project-radius draggable");
        var decorated = decorateContext(color, projectContent);
        decorated.setAttribute("draggable", true);
        var count = "card card-"+boardnum;
        decorated = decorateContext(count, decorated);
        decorated.setAttribute("style","display: none;");
        document.getElementById(cards[card]['status']).appendChild(decorated);

    }
};

var getCardElements = function (elements) {
    var ul = document.createElement("ul");
    for (var i = 0; i < elements.length; i++) {
        var liTag = document.createElement("li");
        liTag.appendChild(document.createTextNode(elements[i]));
        ul.appendChild(liTag);
    }
    var p = document.createElement("p");
    p.appendChild(ul);
    return p;
};

function Board(title, description) {
    this.title = title;
    this.description = description;
    this.timestamp = new Date().toLocaleString();
    this.cards = [];
};

function Card(title) {
    this.title = title;
    this.status = "status-new";
    this.timestamp = new Date().toLocaleString();
    this.elements = [];
};

function  addNewCard(board) {
    var boards = retrieveData("boards");
    var name = "board-" + (Object.keys(boards).length + 1).toString();
    var title =  document.getElementById("title");
    boards[board].cards = new Card(title);
    localStorage.boards = JSON.stringify(boards);
};

function  addNewElement(card) {
    var boards = retrieveData("boards");
    var name = "board-" + (Object.keys(boards).length + 1).toString();
    var title =  document.getElementById("new_element");
    boards[board].cards.elements.push(new Card(title));
    localStorage.boards = JSON.stringify(boards);
};

function  addNewBoard() {
    var boards = retrieveData("boards");
    var name = "board-" + (Object.keys(boards).length + 1);
    var title =  document.getElementById("title").value;
    var description =  document.getElementById("description").value;
    boards[name] = new Board(title, description);
    localStorage.boards = JSON.stringify(boards);
};

// generateData();
var boards = retrieveData("boards");
getBoards("boards");

console.log(boards)
//document.getElementById("result").outerHTML = boards.board1.cards[0].modified;