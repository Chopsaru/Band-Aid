module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //--------------------------------------- get single list of instruments--------------------------------------------------
    function getInstruments(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT  name FROM Instruments";
        console.log("made it past query")
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
    router.get('/',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');

        getInstruments(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q1', context);
            }
        }
    });

    return router;
}();