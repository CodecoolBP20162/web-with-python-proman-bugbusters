/**
 * Created by matyi on 2017.03.15..
 */
$(document).ready(function () {
   $('div').click(function () {
         var jq_boards = retrieveData("boards");
         console.log(jq_boards);
   });
});

