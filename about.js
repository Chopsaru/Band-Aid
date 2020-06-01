
module.exports = function () {
    var express = require('express');
    var router = express.Router();

    //show about page
    router.get('/', function (req, res) {
        res.render('about');
    });

    return router;
}();
