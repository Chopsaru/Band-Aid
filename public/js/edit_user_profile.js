function updateUserProfile(id){
    $.ajax({
        url: '/user_profile/edit/' + id,
        type: 'put',
        data: $('#edit_user_profile').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};