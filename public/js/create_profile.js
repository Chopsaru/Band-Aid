function createProfile(){
    $.ajax({
        url: '/sign_up',
        type: 'POST',
        data: $('#create_user_profile').serialize(),
        success: function(result){
            window.location.replace('/login');
        }
    })
};