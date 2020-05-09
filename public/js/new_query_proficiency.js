import { json } from "body-parser";

function newQueryProficiency(qid){
    console.log($("#new_query_proficiency_form").serialize());
    $.ajax({
        url: '/search/q2/' + qid,
        type: 'PUT',
        data: $("#new_query_proficiency_form").serialize(),
        success: function(result, qid){
            window.location.href = '/search/q3/' + qid;
        }
    })
};
