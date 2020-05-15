
//-------------------------------------------user profile landing page--------------------------------------------------
module.exports = function(){
    var express = require('express');
    var router = express.Router();

//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) =>{
        if(!req.session.userId){
            res.redirect('/login')
        } else {
            next()
        }
    }

// handles user if signed in
    const redirectUser_Profile = (req, res, next) =>{
        if(req.session.userId){
            res.redirect('/user_profile/' + req.session)
        } else {
            next()
        }
    }

//--------------------------------------- get single user profile data -------------------------------------------------

    function getUserProfile(res, mysql, context, id, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT user_id as id, query_id, musician_id, email, fname, lname, phone, social, zip FROM Users WHERE user_id = ?";
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

//-------------------------------------------- get musician data -------------------------------------------------------
    function getInstruments(res, mysql, context, id, complete){
        var inserts = [id]
        mysql.pool.query("SELECT fname, lname, name as insName, proficiency as insProficiency \n" +
            "FROM users \n" +
            "INNER JOIN\tmusicians\n" +
            "ON users.musician_id = musicians.musician_id\n" +
            "INNER JOIN instruments\n" +
            "ON musicians.instrument_id = instruments.instrument_id\n" +
            "WHERE user_id = ?", inserts,function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments  = results;
            complete();
        });
    }

//------------------------------------------ get and display single user -----------------------------------------------

    router.get('/:id', redirectLogin, function(req,res) {
        console.log(req.session);
        console.log(req.session.userId);

        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js","delete_user_profile.js"];
        var mysql = req.app.get('mysql');

        getUserProfile(res, mysql, context, req.session.userId, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('user_profile', context);
            }
        }
    });

//----------------------------------- get and display single user for editing ------------------------------------------

    router.get('/edit/:id',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js","delete_user_profile.js"];
        var mysql = req.app.get('mysql');

        getUserProfile(res, mysql, context, req.params.id, complete);
        getInstruments(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('edit_user_profile', context);
            }
        }
    });

//----------------------------------- change password page ####not functioning yet######--------------------------------

    router.get('/edit/password/:id',function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js","delete_user_profile.js"];
        var mysql = req.app.get('mysql');

        getUserProfile(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update_password', context);
            }
        }
    });

//----------------------------------- updates database for user_profile change -----------------------------------------
    //Need to get instrument, skill level, and gig going #############################################

        router.put('/:id', function(req, res){
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
                })
        ;});

//--------------------------------------------- delete user profiles ---------------------------------------------------
        router.delete('/:id', function(req, res){
            console.log("Made it to delete function")
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM Users WHERE user_id = ?";
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

    return router;
}();
