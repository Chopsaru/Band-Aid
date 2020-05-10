// import { json } from "body-parser";

$(document).ready(function () {
    function newQueryProficiency(qid) {
        console.log("form data: " + $("#new_query_description_form").serialize());
        // $.ajax doesn't work since jquery is not loaded correctly
        // fall back to XMLHttpRequest
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (result) {
            window.location.href = '/search/' + qid;
        };
        xhttp.open("POST", '/search/q4/' + qid, true);
        xhttp.send($("#new_query_description_form").serialize());
    }

    $('#submit_btn').click(function () {
        let qid = $('#submit_btn').attr('data-id');
        newQueryProficiency(qid);
    });
});
