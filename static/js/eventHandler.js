/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
    $(".board").attr("data-toggle", "modal").attr("data-target", ".board-modal").attr("draggable", "true").attr('style', 'cursor:pointer;').click(function () {
        $.each(retrieveData('boards'), function (board, value) {
            $('.' + board).each(function () {
                $(this).click(function () {
                    var newCard = generateEmptyCard(board);
                    $('#new').append(newCard);
                    $('.card').hide();
                    $('.card-' + board).toggle();
                });
            })
        });
    });
    $('#vision').click(function () {
        $('.card').hide()
    })
});