module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var passport = require('passport');

    //show home page
    router.get('/',function(req,res, next) {
        passport.authenticate('local', function(err, user, info){
          if (err) { return next(err); }
          if (!user) { return res.redirect('/login'); }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.render('user_profile' + user.username)
          });
        }) (req, res, next);
        //res.render('login')
    });

    router.post('/login',
      passport.authenticate('local', {  successRedirect: '/user_profile',
                                        failureRedirect: '/login',
                                        failureFlash: true })
    );

    return router;
}();
