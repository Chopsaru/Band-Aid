module.exports = function(){
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt')
    const validUrl = require('valid-url');
    const {Client, Status} = require("@googlemaps/google-maps-services-js");
    var geoKey = "AIzaSyBv5zGSLMMofgJgzdnNkaL7yiGlDh3NuBM";

//----------------------------------------------- session handlers -----------------------------------------------------
// handles user if signed in
    const redirectUser_Profile = (req, res, next) =>{
        if(req.session.userId){
            res.redirect('/user_profile/' + req.session)
        } else {
            next()
        }
    }


//--------------------------------------------- get instrument data ----------------------------------------------------

    function getInstruments(res, mysql, context, complete){

        mysql.pool.query("SELECT instrument_id as id, name as insName FROM Instruments",
            function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments = results;
            complete();
        });
    }

    function convertZip(res, zip, client, context, complete) {
        client
        .geocode({
          params: {
            address: zip,
            key: geoKey,
          },
          timeout: 1000, // milliseconds
        })
        .then((r) => {
          if (r.data.status === Status.OK) {
            context.lat = r.data.results[0].geometry.location.lat;
            context.lng = r.data.results[0].geometry.location.lng;
          } else {
            console.log(r.data.error_message);
            console.log("Geocoding Error!");
          }
          complete();  
        })
        .catch((e) => {
          console.log(e);
        });
    }

//--------------------------------------- get proficiency --------------------------------------------------------------

    function getProficiency(res, mysql, context, complete){

        // Construct query--------------------------------------------------------------
        var sql = "SELECT proficiency_id as id, level as insProficiency FROM Proficiencies";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.proficiencies = results;
            complete();
        });
    }

    //show sign up page
    router.get('/', redirectUser_Profile, function(req,res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["create_profile.js"];

        var mysql = req.app.get('mysql');

        getInstruments(res, mysql, context, complete);
        // get instruments to select from
        getProficiency(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('sign_up', context);
            }
        }
    });

    // create profile
    router.post('/', async(req, res) => {
        try {
            // hash password for security
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            var mysql = req.app.get('mysql');
            const client = new Client({});
            let context = {};
            let callbackCount = 0;

            // validate the url for demo and social            
            if(req.body.demo_link!=='' && !validUrl.isUri(req.body.demo_link)) {
                throw new Error(`Invalid demo link: "${req.body.demo_link}".`);
            }

            if(req.body.social!=='' &&!validUrl.isUri(req.body.social)) {
                throw new Error(`Invalid social link: "${req.body.social}".`);
            }            

            convertZip(res, req.body.zip, client, context, complete);
            let lfg = req.body.lfg==='on'?1:0;

            function complete(){
                callbackCount ++;
                if (callbackCount >= 1) {
                    mysql.pool.query("INSERT INTO Users(instrument_id, proficiency_id, email, password, fname, lname," +
                    "phone, social, zip, lat, lng, lfg, demo_link) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?);",
                    [req.body.insName, req.body.proficiency, req.body.email, hashedPassword, req.body.fname,
                    req.body.lname, req.body.phone, req.body.social, req.body.zip, context.lat, context.lng, lfg, req.body.demo_link], function (error) {
                        if (error) {
                            console.log(JSON.stringify(error));
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            res.redirect('/login');
                        }
                    });
                }
            }
        }                 
        catch (err) {
            console.log('Error! '+ err + ' Redirecting to sign up page')
            res.status(500).send({
                error: {
                    status: 500,
                    message: `${err}`
                }
            });
        }
    });

    return router;
}();