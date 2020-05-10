// import { json } from "body-parser";

$(document).ready(function () {
    function newQueryLocation(qid) {
        console.log("form data: " + $("#new_query_location_form").serialize());

        // $.ajax doesn't work since jquery is not loaded correctly
        // fall back to XMLHttpRequest
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (result) {
            window.location.href = '/search/q4/' + qid;
        };
        xhttp.open("POST", '/search/q3/' + qid, true);
        xhttp.send($("#new_query_location_form").serialize());
    }

    $('#submit_btn').click(function () {
        let qid = $('#submit_btn').attr('data-id');
        newQueryLocation(qid);
    });
});