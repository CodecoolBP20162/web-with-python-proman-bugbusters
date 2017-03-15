/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
    var jqBoards = retrieveData('boards');
    console.log(jqBoards);
    for (var board in jqBoards) {
        console.log('.'+board);
        $('.'+ board).click(function () {
            console.log('2');
            for (card in jqBoards[board]) {
                $('.' + card).toggle();
                console.log('.'+card);
            }
        });
    }
});

