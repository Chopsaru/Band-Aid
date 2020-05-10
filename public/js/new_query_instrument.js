// import { json } from "body-parser";

$(document).ready(function() {
    function newQueryInstrument(qid){
        console.log("form data: " + $("#new_query_instrument_form").serialize());
        // $.ajax doesn't work since jquery is not loaded correctly
        // fall back to XMLHttpRequest
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function(result){
            window.location.href = '/search/q2/' + qid;
        };
        xhttp.open("POST", '/search/q1/' + qid, true);
        xhttp.send($("#new_query_instrument_form").serialize());
    }

    $('#submit_btn').click(function() {
        let qid = $('#submit_btn').attr('data-id');
        newQueryInstrument(qid);
    });
});
