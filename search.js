module.exports = function(){
    let express = require('express');
    let router = express.Router();

    function getMatchingMusicians(res, req, mysql, context, complete){
        //now entering callback hell

        //get query rows with matching userid
            // Construct query--------------------------------------------------------------
            let sql = "SELECT * FROM Queries where query_id = ?";
            inserts = [req.params.uid];

            // Query and store results------------------------------------------------------
            console.log("SELECT * FROM Queries where query_id = " + req.params.uid)
            mysql.pool.query(sql, inserts, function(error, queryResults){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                else{
                    console.log(queryResults)
                    var uid = req.params.uid;
                    var qid = queryResults[0].query_id;
                    var qzip = queryResults[0].zip_code;
                    var qinstrument = queryResults[0].instrument;
                    var qproficiency = queryResults[0].proficiency;
                    var qdescription = queryResults[0].description;

                    //get user zip code from database

                    //get musicians with the same first 2 zip code numbers
                    //eventually, a radius alrogithm will replace this

                    //get musician ids from instrument table that match with user querys

                    //get musician/user information 

                    //reformat data into json or store to context
                }
            });

        

        //now leaving callback hell
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