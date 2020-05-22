function sendInvites(id){
     $.ajax({
         url: '/search/' + id,
         type: 'POST',
         data: $('#inv_form').serialize(), 
         success: function(result){
             window.location.replace('/user_profile/' + id);
         }
     })
 };