module.exports = function(){
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt')

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

//---------------------------------------------------- user login ------------------------------------------------------

    // show login page
    router.get('/', redirectUser_Profile,function(req,res) {
        res.render('login')
    });

    // login verification and session set up
    router.post('/', function(req,res) {

        var mysql = req.app.get('mysql');
        var inserts = [req.body.email];

        mysql.pool.query("SELECT user_id as id, email as dbEmail, password as dbPassword FROM Users WHERE email = ?", inserts, async function(error, results){
            if(error){
               res.write(JSON.stringify(error));
               res.end();
            }
            var dbPass = results[0].dbPassword;
            var id = results[0].id;
            var dbEmail = results[0].dbEmail;



            console.log(dbPass);
            console.log(dbEmail)
            console.log(id);
            // hash password for security
            const passwordMatched = await bcrypt.compare(req.body.password, dbPass);
            // Work on matching here to validate min 26 in video
            if(req.body.email === dbEmail && passwordMatched) {
                req.session.userId = id;
                return res.redirect('/user_profile/' + req.session.userId);
            }else{
                res.redirect('/login');
            }
        });

    });
    return router;
}();