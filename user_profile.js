//-------------------------------------------user profile landing page--------------------------------------------------
module.exports = function(){
    var express = require('express');
    var router = express.Router();

//--------------------------------------- get single user profile data--------------------------------------------------
    function getUserProfile(res, mysql, context, id, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT  query_id, musician_id, email, fname, lname, phone, social, zip FROM Users WHERE user_id = ?";
        var inserts = [id];
        console.log("made it past query")
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

    router.get('/:id',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');

        context.jsscripts = ["updateUserProfile.js"];

        getUserProfile(res, mysql, context, req.params.id, complete);
        //getUserID(res, mysql,context,complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('user_profile', context);
            }
        }

        //res.render('user_profile')
    });

        // Update or edit planet row value

    router.get('/edit_user:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateUserProfie.js"];
        var mysql = req.app.get('mysql');
        getUserProfile(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_user_profile', context);
            }

        }
    });

        router.put('/edit_profile:id', function(req, res){
            console.log(req.body);
            console.log(req.params.id);

            var mysql = req.app.get('mysql');
            mysql.pool.query("UPDATE Users SET email=?, fname=?, lname=?, phone=?, zip=? WHERE user_id=?",
                [req.body.email, req.body.fname, req.body.lname, req.body.phone, req.body.zip, req.params.id],
                function(error){
                    if(error){
                        console.log(error);
                        res.write(JSON.stringify(error));
                        res.end();
                    }else{
                        res.status(200);
                        res.end();
                    }
                });});

        /*
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
