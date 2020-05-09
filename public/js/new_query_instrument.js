import { json } from "body-parser";

function newQueryInstrument(qid){
    console.log($("#new_query_instrument_form").serialize());
    $.ajax({
        url: '/search/q1/' + qid,
        type: 'POST',
        data: $("#new_query_instrument_form").serialize(),
        success: function(result, qid){
            window.location.href = '/search/q2/' + qid;
        }
    })
};
