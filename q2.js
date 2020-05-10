module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProficiencies(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        let sql = "SELECT proficiency_name FROM Proficiency";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.proficiency = results;
            console.log(results);
            complete();
        });
    }

    //show page
    router.get('/:qid',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["new_query_proficiency.js"];
        var mysql = req.app.get('mysql');

        getProficiencies(res, mysql, context, complete);

        context.qid = req.params.qid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q2', context);
            }
        }
    });

    //put submit instrument
    router.post('/:qid', (req, res) => {
        let emp = req.body;
        console.log(emp)
        var sql = "UPDATE Queries SET proficiency = ? where query_id = ?";
        var inserts = [emp.proficiency, req.params.qid];

        console.log("UPDATE Queries SET proficiency = " + emp.proficiency +
            "where query_id = " + req.params.qid);

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