function areYouSure(){
    return confirm('Are you sure you want to delete this account?');
}
function deleteUserProfile(id){
    $.ajax({
        url: '/user_profile/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.replace('/');
        }
    })
};