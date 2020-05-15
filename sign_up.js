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

    //show sign up page
    router.get('/',function(req,res) {
        console.log(req.session);
        res.render('sign_up');
    });

    app.post('/sign_up', redirectLogin, async(req, res) => {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            var mysql = req.app.get('mysql');
            mysql.pool.query("INSERT INTO Users(name, email, password) VALUES(?, ?, ?);",
                [req.body.name, req.body.email, hashedPassword])

            res.redirect('/login')
        } catch{
            res.redirect('/register')
        }
    })

    return router;
}();