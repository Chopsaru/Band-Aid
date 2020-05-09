module.exports = function(){
    var express = require('express');
    var router = express.Router();


    //show page
    router.get('/:qid',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["new_query_proficiency.js"];
        var mysql = req.app.get('mysql');

        context.qid = req.params.qid;

        res.render('q2', context);
    });

     //put submit instrument
    router.post('/:qid', (req, res) => {
        let emp = req.body;
        console.log(emp)
        var sql = "UPDATE queries SET proficiency = ? where query_id = ?";
        var inserts = [emp.proficiency, req.params.qid];

        console.log("UPDATE queries SET proficiency = " + emp.proficiency +  "where user_id = " + req.params.qid)

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