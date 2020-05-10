module.exports = function(){
    let express = require('express');
    let router = express.Router();

    //show search page
    router.get('/',function(req,res) {
        res.render('search')
    });

    return router;
}();