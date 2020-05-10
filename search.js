module.exports = function(){
    let express = require('express');
    let router = express.Router();

    function getUserQuery(req, mysql){
        // Construct query--------------------------------------------------------------
        let sql = "SELECT * FROM Queries where query_id = ?";
        inserts = [req.params.uid];

        // Query and store results------------------------------------------------------
        console.log("SELECT * FROM Queries where query_id = " + req.params.uid)
        mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
               }
               return results[0]
           });
   }

    function getMatchingMusicians(res, req, mysql, context, complete){
        //get query rows with matching userid
        var queryResults = getUserQuery(req, mysql)
        
        console.log(queryResults)

        //get user zip code from database

        //get s musicians with the same first 2 zip code numbers
        //eventually, a radius alrogithm will replace this

        //get musician ids from instrument table that match with user querys

        //get musician/user information 

        //reformat data into json or store to context

        complete();
    }

    //show page
    router.get('/:uid',function(req,res) {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');

        getMatchingMusicians(res, req, mysql, context, complete);

        context.uid = req.params.uid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('search', context);
            }
        }
    });

    return router;
}();