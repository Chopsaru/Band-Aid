module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //--------------------------------------- get single list of instruments--------------------------------------------------
    function getInstruments(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT name FROM instruments";
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
    router.get('/:qid',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["new_query_instruments.js"];
        var mysql = req.app.get('mysql');

        getInstruments(res, mysql, context, complete);

        context.qid = req.params.qid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q1', context);
            }
        }
    });

    //post submit instrument
    router.post('/:qid', (req, res) => {
        let emp = req.body;
        console.log(emp)
        var sql = "INSERT INTO queries (query_id, radius, instrument, proficiency, description) \
            VALUES (?, '-1', ?, -1, '-1') \
            ON DUPLICATE KEY UPDATE instrument = ?;";
        var inserts = [req.params.qid, emp.instrument, emp.instrument];

        console.log("INSERT INTO queries (query_id, radius, instrument, proficiency, description) \
        VALUES (" + req.params.qid + ", '-1', " + emp.instrument + ", -1, '-1') \
        ON DUPLICATE KEY UPDATE instrument = " + emp.instrument + ";")

        var mysql = req.app.get('mysql');
        mysql.pool.query(sql, inserts, function(error){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                console.log("query sucess")
                res.status(200);
            }
        });
    });

    return router;
}();