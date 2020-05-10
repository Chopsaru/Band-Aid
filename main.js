/*********************************************************************************
 ** Program Name:	main.js
 ** Authors:		Team Band Aid
 ** Date:		    4/17/2020
 ** Description:	js to run Band Aid Home Page
 *******************************************************************************/

var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var ip = require('ip');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.set('port', 5000);
app.set('mysql', mysql);

// app.use('/', express.static('/public'))
app.use('/home', require('./home.js'));
app.use('/login', require('./login.js'));
app.use('/sign_up', require('./sign_up.js'));
app.use('/user_profile', require('./user_profile.js'));
app.use('/search', require('./search.js'));
app.use('/search/q1', require('./q1.js'));
app.use('/search/q2', require('./q2.js'));
app.use('/search/q3', require('./q3.js'));
app.use('/search/q4', require('./q4.js'));

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
    console.log(ip.address());
    console.log(`Express started on http://${ip.address()}:5000/` +  '; press Ctrl-C to terminate.');
});