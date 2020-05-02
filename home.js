module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //show home page
    router.get('/',function(req,res) {
        res.render('home')
    });
    /// comment
    return router;
}();