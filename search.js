module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //show search page
    router.get('/',function(req,res) {
        res.render('search')
    });

    return router;
}();