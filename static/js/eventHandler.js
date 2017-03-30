/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
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
    }
    clickSetter()
});