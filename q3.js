module.exports = function(){
    let express = require('express');
    let router = express.Router();

    //show page
    router.get('/:uid',function(req,res) {
        let context = {};

        context.uid = req.params.uid;
        
        res.render('q3', context);
    });

    return router;
}();