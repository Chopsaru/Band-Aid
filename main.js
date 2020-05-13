/*********************************************************************************
 ** Program Name:	main.js
 ** Authors:		Team Band Aid
 ** Date:		    5/9/2020
 ** Description:	js to run Band Aid Home Page
 *******************************************************************************/

var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var flash = require('connect-flash');
var handlebars = require('express-handlebars').create({defaultLayout:'main'})
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5000);

app.use('/static', express.static('public'));
app.use('/modules', express.static('node_modules'));
app.use(cookieParser());
app.use(session({
  secret: 'SecretSecret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('mysql', mysql);

// Passport LocalStrategy
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, username, password, done){
      console.log(username+' = '+ password);
      if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      pool.query("select * from Users where email = ?", [email], function(err, rows){
          console.log(err);
        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
        salt = salt+''+password;
        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
        var dbPassword  = rows[0].password;

        if(!(dbPassword == encPassword)){
            return done(null, false, req.flash('message','Invalid username or password.'));
         }
         req.session.user = rows[0];
        return done(null, rows[0]);
      });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    connection.query("select * from Users where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

app.get('/login', function(req, res){
  res.render('login', {'message' :req.flash('message')});
});

app.post('/login', passport.authenticate('local', {
    successRedirect: 'user_profile',
    failureRedirect: 'login',
    failureFlash: true
  }), function(req, res, info){
  res.render('user_profile',{'message' :req.flash('message')});
});

app.use('/user_profile', require('./user_profile.js'));
/*
app.use('/', require('./home.js'));
app.use('/login', require('./login.js'));
app.use('/sign_up', require('./sign_up.js'));
app.use('/user_profile', require('./user_profile.js'));
app.use('/', express.static('public'));
*/
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://54.89.126.206:5000/' +  '; press Ctrl-C to terminate.');
});
