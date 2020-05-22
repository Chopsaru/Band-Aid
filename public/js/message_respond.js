function msgRespond(ans, iid, sid, msgid ){
    $.post('/user_profile/' + ans, { inid: iid, senderid : sid, msg_id: msgid
    }, 
        function(returnedData){
            console.log(returnedData);
        });
 }