module.exports = function(){
    var express = require('express');
    var router = express.Router();

     //--------------------------------------- get query description--------------------------------------------------
     function getDesc(res, mysql, context, qid, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT description FROM Queries WHERE query_id = ?";
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
        context.jsscripts = ["new_query_description.js"];
        var mysql = req.app.get('mysql');

        getDesc(res, mysql, context, req.params.qid, complete);

        context.qid = req.params.qid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q4', context);
            }
        }
    });

    //post submit description
    router.post('/:qid', (req, res) => {
        let emp = req.body;
        console.log(emp);
        var sql = "UPDATE Queries SET description = ? where query_id = ?";
        var inserts = [emp.description, req.params.qid];

        console.log("UPDATE Queries SET description = " + emp.description +
            "where description = " + req.params.qid);

        var mysql = req.app.get('mysql');
        mysql.pool.query(sql, inserts, function(error){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                console.log("query success")
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();