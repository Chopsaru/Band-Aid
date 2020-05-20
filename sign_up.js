module.exports = function(){
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt')

//----------------------------------------------- session handlers -----------------------------------------------------
// handles user if signed in
    const redirectUser_Profile = (req, res, next) =>{
        if(req.session.userId){
            res.redirect('/user_profile/' + req.session)
        } else {
            next()
        }
    }

//--------------------------------------------- get instrument data ----------------------------------------------------

    function getInstruments(res, mysql, context, complete){

        mysql.pool.query("SELECT instrument_id as id, name as insName FROM instruments",
            function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments = results;
            complete();
        });
    }

//--------------------------------------- get proficiency --------------------------------------------------------------

    function getProficiency(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT proficiency_id as id, level as insProficiency FROM proficiencies";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.proficiencies = results;
            complete();
        });
    }

    //show sign up page
    router.get('/', redirectUser_Profile, function(req,res) {
        console.log(req.session.userId);
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["create_profile.js"];

        var mysql = req.app.get('mysql');

        getInstruments(res, mysql, context, complete);
        // get instruments to select from
        getProficiency(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('sign_up', context);
            }
        }
    });

    // create profile
    router.post('/', async(req, res) => {
        console.log("Made to sign up post");
        console.log(req.body);
        try {
            // hash password for security
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            var mysql = req.app.get('mysql');

            mysql.pool.query("INSERT INTO Users(instrument_id, proficiency_id, email, password, fname, lname," +
                "phone, social, zip, lfg, demo_link) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [req.body.insName, req.body.proficiency, req.body.email, hashedPassword, req.body.fname,
                    req.body.lname, req.body.phone, req.body.social, req.body.zip, 1, req.body.demo_link], function (error) {
                    if (error) {
                        console.log(JSON.stringify(error))
                        res.write(JSON.stringify(error));
                        res.end();
                    } else {
                        res.redirect('/login');
                    }
                });
        } catch {
            res.redirect('/sign_up')
        }
    });

    return router;
}();