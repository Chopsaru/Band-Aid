module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //show home page
    router.get('/',function(req,res) {
        console.log(req.session);
        res.render('sign_up');
    });

    return router;
}();