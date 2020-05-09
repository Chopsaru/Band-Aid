function updateUserProfile(id){
        $.ajax({
        url: '/user_profile/' + id,
        type: 'PUT',
        data: $('#edit_user_profile').serialize(),
        success: function(result){
            window.location.replace('/user_profile/' + id);
        }
    })
};

