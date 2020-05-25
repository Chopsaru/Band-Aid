module.exports = function(){
    var express = require('express');
    var router = express.Router();

//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) =>{
        if(!req.session.userId){
            res.redirect('/login')
        } else {
            next()
        }
    }

    //--------------------------------------- get single list of instruments--------------------------------------------------
    function getInstruments(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        let sql = "SELECT name FROM Instruments";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments = results;
            complete();
        });
    }

    //show page
    router.get('/:uid',redirectLogin,function(req,res) {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');

        context.jsscripts = ['q1script.js'];

        getInstruments(res, mysql, context, complete);

        context.uid = req.params.uid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q1', context);
            }
        }
    });

    return router;
}();