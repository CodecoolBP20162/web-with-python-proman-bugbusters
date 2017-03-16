/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
    $(".board").attr("data-toggle", "modal").attr("data-target", ".board-modal").attr("draggable", "true");
    var jqBoards = retrieveData('boards');
    $.each(jqBoards, function (board, value) {
        $('.'+ board).each(function () {
            $('.board-modal').toggle();
            $(this).click(function () {
                $('.card').hide();
                $('.card-' + board).toggle();
            })
        });
    });
});