module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProficiencies(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        let sql = "SELECT * FROM Proficiencies";
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
    router.get('/:uid',function(req,res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getProficiencies(res, mysql, context, complete);

        context.uid = req.params.uid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('q2', context);
            }
        }
    });

    return router;
}();