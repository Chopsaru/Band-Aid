const express = require('express')
const session = require('express-session')
const mysql = require('./dbcon.js')
const app = express()
const NodeCache = require("node-cache");
const in_mem_cache = new NodeCache();

const handlebars = require('express-handlebars').create({
  helpers: require("./helpers.js").helpers,
  defaultLayout: 'main'
})
const bodyParser = require('body-parser')
const ip = require('ip')

// cookie lifetime
const TWO_HOURS = 1000 * 60 * 60 * 2

// env variables
const {
  NODE_ENV = 'development',
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'super-secret-code',
  SESSION_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD = NODE_ENV === 'production'

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', 5000)
app.set('mysql', mysql)
app.set('in_mem_cache', in_mem_cache);

// expression-session configuration
app.use(session({
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true,
    secure: IN_PROD,                // look into mysql session store
  }
}))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// point at public directory folder
app.use('/', express.static('public'))

// pages in site
app.use('/', require('./home.js'))
app.use('/login', require('./login.js'))
app.use('/logout', require('./logout.js'))
app.use('/bad_login', require('./bad_login.js'))
app.use('/sign_up', require('./sign_up.js'))
app.use('/user_profile', require('./user_profile.js'))
app.use('/search', require('./search.js'))
app.use('/search/q1', require('./q1.js'))
app.use('/search/q2', require('./q2.js'))
app.use('/search/q3', require('./q3.js'))

// error handling
app.use(function (req, res) {
  res.status(404)
  res.render('404')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.type('plain/text')
  res.status(500)
  res.render('500')
})

// node start up
app.listen(app.get('port'), function () {
  console.log(ip.address())
  console.log(`Express started on http://${ip.address()}:5000/` + '; press Ctrl-C to terminate.')
})
