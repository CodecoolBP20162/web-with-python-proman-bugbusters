/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
    $(".board").attr("data-toggle", "modal").attr("data-target", ".board-modal").attr("draggable", "true").attr('style', 'cursor:pointer;').click(function () {
        $.each(boards, function (board, value) {
            $('.' + board).each(function () {
                $(this).click(function () {
                    $('.card').hide();
                    $('.card-' + board).toggle();
                });
            })
        });
    });
});