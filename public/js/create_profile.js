function createProfile(){
    $.ajax({
        url: '/sign_up',
        type: 'POST',
        data: $('#create_user_profile').serialize(),
        success: function(result){
            window.location.replace('/login');
        },
        error: function(xhr, status, error) {
            $('#toast-content').html(xhr.responseJSON.error.message + " Please fix it and resubmit.");
            $('.toast').toast('show');
        }
    })
};