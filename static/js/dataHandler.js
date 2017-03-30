var generateData = function () {
        // Create dictionary
        var boards = {};
        boards.board1 = { title: "Board #1", description: "First board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board1.cards = [{}, {}, {}];
        boards.board1.cards[0] = { status: "new", elements: 'Some description', modified: new Date().toLocaleString() };
        boards.board1.cards[1] = { status: "planning", elements: 'Some description', modified: new Date().toLocaleString() };
        boards.board1.cards[2] = { status: "done", elements: 'Some description', modified: new Date().toLocaleString() };

        boards.board2 = { title: "Board #2", description: "Second board", timestamp: new Date().toLocaleString(), cards: [] };
        boards.board2.cards = [{}, {}, {}];
        boards.board2.cards[0] = { status: "new", elements: 'Some description', modified: new Date().toLocaleString() };
        boards.board2.cards[1] = { status: "in-progress", elements: 'Some description', modified: new Date().toLocaleString() };
        boards.board2.cards[2] = { status: "new", elements: 'Some description', modified: new Date().toLocaleString() };

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


var getNewCardElement = function (num) {
    var id = "card-element-"+num.toString();
    var cardelement = generateInput(id, 6, 20);
    return cardelement
};


var getBoards = function(allBoards) {
    var j = 1;
    for (var i in allBoards) {
        console.log(allBoards[i]);
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
    var h1 = document.createElement("h1");
    var text = document.createTextNode(board.title);
    h1.className = "lead";
    h1.appendChild(text);
    var p = document.createElement("p");
    var description = document.createTextNode(board.description);
    p.appendChild(description);
    var hover = document.createElement("div");
    hover = decorateContext("portfolio-overlay portfolio-item", hover);
    var time = document.createElement("h2");
    time.appendChild(document.createTextNode(board.timestamp));
    var cards = document.createElement("h2");
    cards.appendChild(document.createTextNode(board.cards.length));
    projectContent.appendChild(h1);
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
        var p = document.createTextNode(cards[card].elements);
        projectContent.appendChild(p);
        var color = ("project project-radius draggable");
        var decorated = decorateContext(color, projectContent);
        decorated.setAttribute("draggable", true);
        var count = "card card-"+boardnum;
        decorated = decorateContext(count, decorated);
        decorated.setAttribute("style","display: none;");
        document.getElementById(cards[card].status).appendChild(decorated);
    }
};

var Board = function (title, description) {
    this.title = title;
    this.description = description;
    this.timestamp = new Date().toLocaleString();
    this.cards = [];
};

var Card = function (title, new_task) {
    this.title = title;
    this.status = "new";
    this.timestamp = new Date().toLocaleString();
    this.elements = new_task;
};

var addNewCard = function (board) {
    var boards = retrieveData("boards");
    var new_task = document.getElementById("new_task").value;
    var card = new Card(new_task);
    boards[board].cards.push(card);
    var projectContent = document.createElement("div");
    projectContent.className = "project-content";
    var p = document.createTextNode(new_task);
    projectContent.appendChild(p);
    var color = ("project project-radius draggable");
    var decorated = decorateContext(color, projectContent);
    decorated.setAttribute("draggable", true);
    var count = "card card-"+board;
    decorated = decorateContext(count, decorated);
    decorated.setAttribute("style","display: block;");
    document.getElementById(card.status).appendChild(decorated);
    localStorage.boards = JSON.stringify(boards);
};


var addNewBoard = function() {
    var boards = retrieveData("boards");
    var name = "board" + (Object.keys(boards).length + 1);
    var title =  document.getElementById("title").value;
    var description =  document.getElementById("description").value;
    boards[name] = new Board(title, description);
    var projectContent = createProjectContent(boards[name]);
    var ediv = decorateContext("portfolio-thumb draggable", projectContent);
    ediv.setAttribute('draggable', 'true');
    var div = decorateContext("item iso-box col-lg-3 col-md-4 col-sm-6 col-xs-12", ediv);
    var count = "board"+(Object.keys(boards).length).toString();
    var adiv = decorateContext(count, div);
    document.getElementById("board-holder").appendChild(adiv);
    getCards(boards[name].cards, count);
    document.getElementById("description").value = ("");
    document.getElementById("title").value = ("");
    clickSetter();
    localStorage.boards = JSON.stringify(boards);
};

var getFromServer = function () {
    $.ajax({
        type: "GET",
        url: "/query",
        success: function (data) {
            console.log(data);
            getBoards(JSON.parse(data))
        }
    })
};


var clickSetter = function () {
    $(".board").attr("data-toggle", "modal").attr("data-target", ".board-modal").attr("draggable", "true").attr('style', 'cursor:pointer;').click(function () {
        $.each(retrieveData('boards'), function (board, value) {
            $('.' + board).each(function () {
                $(this).click(function () {
                    $('#submit-card').attr('onclick', 'addNewCard("'+board+'");');
                    $('.card').hide();
                    $('.card-' + board).toggle();
                });
            })
        });
    });
    $('#vision').click(function () {
        $('.card').hide();
        $('#submit-card').removeAttr('onclick');
    });
    $('#submit-card').click(function () {
        $(this).removeAttr()
    })
};


getBoards({"board1": {"id": 1, "cards": [{"description": "This is the first card!", "status": "new", "id": 1, "position": "1"}, {"description": "This is the second card!", "status": "new", "id": 2, "position": "2"}, {"description": "This is the third card!", "status": "planning", "id": 3, "position": "1"}], "position": "1", "description": "This is the first board!", "timestamp": "2017-03-27", "title": "Board1"}, "board2": {"id": 2, "cards": [{"description": "This is the fourth card!", "status": "planning", "id": 4, "position": "2"}, {"description": "This is the fifth card!", "status": "in-progress", "id": 5, "position": "1"}, {"description": "This is the sixth card!", "status": "in-progress", "id": 6, "position": "2"}], "position": "2", "description": "This is the second board!", "timestamp": "2017-03-27", "title": "Board2"}, "board3": {"id": 3, "cards": [{"description": "This is the seventh card!", "status": "done", "id": 7, "position": "1"}, {"description": "This is the eightth card!", "status": "done", "id": 8, "position": "2"}], "position": "3", "description": "This is the third board!", "timestamp": "2017-03-27", "title": "Board3"}, "board4": {"id": 4, "cards": [], "position": "4", "description": "This is the fourth board!", "timestamp": "2017-03-27", "title": "Board4"}});
clickSetter();
