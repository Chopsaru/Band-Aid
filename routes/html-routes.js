// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  app.get("/", function(req, res) {
    var context = {};
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("user_profile");
    }
    res.render("login");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("user_profile");
    }
    res.render("login");
  });

  app.get("/user_profile", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("user_profile");
    }
    res.render("login");
  });

  app.get("/sign_up", function(req, res) {
    res.render("sign_up");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
