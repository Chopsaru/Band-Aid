function checkPassword(){
    console.log("Made it to check Password")
    $.ajax({
        url: '/login',
        type: 'POST',
        data: $('#login_form').serialize(),
        success: function(result){
          //  window.location.replace('/user_profile/' + id);
        }
    })
};