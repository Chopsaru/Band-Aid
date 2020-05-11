module.exports = function(){
    let express = require('express');
    let router = express.Router();

    //--------------------------------------- get single list of instruments--------------------------------------------------
    function getLocation(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        let sql = "SELECT zip_code FROM Musicians";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.zipcodes = results;
            complete();
        });
    }


    //show page
    router.get('/:qid',function(req,res) {
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["new_query_location.js"];
        let mysql = req.app.get('mysql');

        getLocation(res, mysql, context, complete);

        context.qid = req.params.qid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q3', context);
            }
        }
    });

    //post submit instrument
    router.post('/:qid', (req, res) => {
        let emp = req.body;
        console.log(emp);
        var sql = "UPDATE Queries SET zip_code = ? where query_id = ?";
        var inserts = [emp.zip_code, req.params.qid];

        console.log("UPDATE Queries SET zip_code = " + emp.zip_code +
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