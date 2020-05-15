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

//---------------------------------------------------- user login ------------------------------------------------------

    // show login page
    router.get('/', redirectUser_Profile,function(req,res) {
        //console.log(req.session)
        res.render('login')
    });

    // login verification and session set up
    router.post('/',function(req,res) {
        //console.log(req.session)
        //console.log(req.body);
        //console.log(req.body.email)
        //console.log(req.body.password)

        var mysql = req.app.get('mysql');
        var inserts = [req.body.email];

        mysql.pool.query("SELECT user_id as id, email as dbEmail, password as dbPassword FROM Users WHERE email = ?", inserts, function(error, results){
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

            // Work on matching here to validate min 26 in video
            if(req.body.email === dbEmail && req.body.password === dbPass) {
                req.session.userId = id;
                return res.redirect('/user_profile/' + req.session.userId);
            }
            res.redirect('/login');
        });

    });
    return router;
}();