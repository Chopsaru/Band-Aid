module.exports = function(){
    var express = require('express');
    var router = express.Router();

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
    router.get('/:uid',function(req,res) {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');

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