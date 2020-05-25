function msgRespond(ans, iid, sid, msgid ){
    //iid = inbox id, sid = sender id
        $.ajax({
            url: '/user_profile/' + ans,
            type: 'POST',
            data: { inid: iid, senderid : sid, msg_id: msgid},
            success: function(result){
                location.reload();
            }
        })
 }