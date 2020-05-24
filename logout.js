module.exports = function () {
  var express = require('express')
  var router = express.Router()
  const bcrypt = require('bcrypt')


  router.get('/', function (req, res) {
    req.session.destroy(function(err) {
      // cannot access session here
    })

    res.render('login', {});
  })



  return router
}()