module.exports = function(){
    let express = require('express');
    let router = express.Router();

//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) =>{
        if(!req.session.userId){
            res.redirect('/login')
        } else {
            next()
        }
    }

    //show page
    router.get('/:uid',redirectLogin,function(req,res) {
        let context = {};

        context.uid = req.params.uid;
        
        res.render('q3', context);
    });

    return router;
}();