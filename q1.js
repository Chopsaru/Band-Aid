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
    router.get('/:qid',function(req,res) {
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["new_query_instrument.js"];
        let mysql = req.app.get('mysql');

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
        let sql = "INSERT INTO Queries (query_id, zip_code, instrument, proficiency, description) \
            VALUES (?, '-1', ?, '-1', '-1') \
            ON DUPLICATE KEY UPDATE instrument = ?;";
        let inserts = [req.params.qid, emp.instrument, emp.instrument];

        console.log("INSERT INTO Queries (query_id, zip_code, instrument, proficiency, description) \
        VALUES (" + req.params.qid + ", '-1', " + emp.instrument + ", '-1', '-1') \
        ON DUPLICATE KEY UPDATE instrument = " + emp.instrument + ";")

        var mysql = req.app.get('mysql');
        mysql.pool.query(sql, inserts, function(error){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                console.log("query Success")
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();