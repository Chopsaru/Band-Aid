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

app.engine('handlebars', handlebars.engine);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('/public'));

app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/', express.static(__dirnname));
app.use('/home', require('./home.js'));
app.use('/login', require('./login.js'));
app.use('/sign_up', require('./sign_up.js'));
app.use('/user_profile', require('./user_profile.js'));

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

app.listen(5000, function(){
    console.log('Express started on http://54.89.126.206:5000/' +  '; press Ctrl-C to terminate.');
});