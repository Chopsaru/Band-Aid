//-------------------------------------------user profile landing page--------------------------------------------------
module.exports = function(){
    var express = require('express');
    var router = express.Router();

//--------------------------------------- get single user profile data--------------------------------------------------
    function getUserProfile(res, mysql, context, id, complete){

        // Construct query--------------------------------------------------------------
        var sql = "INSERT SQL QUERY";
        var inserts = [id];

        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user_profile = results[0];
            complete();
        });
    }
//-------------------------------------------get single user id---------------------------------------------------------
    function getUserID(res, mysql, context, complete) {
       var sql = "SELECT DISTINCT user_id,......";

        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user_id = results;
            complete();
        });
    }

    //show user profile page
/*
    router.get('/',function(req,res) {
        res.render('user_profile')
    });
*/

    router.get('/',function(req,res) {
/*-------------------for future use-----------------------------------------
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["DELETE JS CODE NAME", "EDIT JS CODE NAME"];
        var mysql = req.app.get('mysql');

        getUserProfile(res, mysql,context,complete);
        getUserID(res, mysql,context,complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('user_profile',context);
            }
        }
 */
        res.render('user_profile')
    });

/*
    // Update or edit planet row value
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');

        mysql.pool.query("UPDATE Planet SET name=?, classification=?, mass=?, known_number_of_moons=? WHERE planet_ID=?",
            [req.body.name, req.body.classification, req.body.mass, req.body.num_moons, req.params.id],
            function(error){
                if(error){
                    console.log(error);
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.status(200);
                    res.end();
                }
            });
    });

    // Delete planet from Planet table
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Planet WHERE planet_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });
*/
    return router;
}();
