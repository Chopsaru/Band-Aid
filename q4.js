module.exports = function(){
    var express = require('express');
    var router = express.Router();

     //--------------------------------------- get query description--------------------------------------------------
     function getDesc(res, mysql, context, qid, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT description FROM queries t1 INNER JOIN users t2 ON t1.query_id = t2.query_id WHERE user_id = ?";
        var inserts = [qid];
        console.log("made it past query")
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.description = results;
            complete();
        });
    }

    //show page
    router.get('/:qid',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');

        getDesc(res, mysql, context, req.params.qid, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q4', context);
            }
        }
    });

    return router;
}();