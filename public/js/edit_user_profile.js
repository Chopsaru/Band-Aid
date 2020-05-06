function updateUserProfile(id){
    $.ajax({
        url: '/user_profile/edit_profile' + id,
        type: 'put',
        data: $('#edit_user_profile').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};