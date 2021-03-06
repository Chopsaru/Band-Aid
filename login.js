module.exports = function () {
  var express = require('express')
  var router = express.Router()
  const bcrypt = require('bcrypt')

//----------------------------------------------- session handlers -----------------------------------------------------

// handles user if signed in
  const redirectUser_Profile = (req, res, next) => {
    if (req.session.userId) {
      res.redirect('/user_profile/' + req.session)
    } else {
      next()
    }
  }

//---------------------------------------------------- user login ------------------------------------------------------

  // show login page
  router.get('/', redirectUser_Profile, function (req, res) {
    res.render('login')
  })

  // login verification and session set up
  router.post('/', function (req, res) {

    var mysql = req.app.get('mysql')
    var inserts = [req.body.email]

    mysql.pool.query('SELECT user_id as id, email as dbEmail, password as dbPassword FROM Users WHERE email = ?', inserts, async function (error, results) {
      if (error) {
        res.write(JSON.stringify(error))
        res.end()
      }

      var dbPass = results[0].dbPassword
      var id = results[0].id
      var dbEmail = results[0].dbEmail

      // secure login
      const passwordMatched = await bcrypt.compare(req.body.password, dbPass, function (err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          res.redirect('/bad_login')
        } else {
          if (req.body.email === dbEmail) {
            req.session.userId = id
            return res.redirect('/user_profile/' + req.session.userId)
          } else {
            res.redirect('/bad_login')
          }
        }
      })
    })

  })
  return router
}()