module.exports = function(){
    let express = require('express');
    let router = express.Router();

    const {Client, Status} = require("@googlemaps/google-maps-services-js");
    var geoKey = "AIzaSyBv5zGSLMMofgJgzdnNkaL7yiGlDh3NuBM";
    var http = require("https");

//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) =>{
        if(!req.session.userId){
            res.redirect('/login')
        } else {
            next()
        }
    }


    function getZip(res, zip, client, context, complete) {
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
            console.log("Google Geocoding:");  
            console.log("Lat: ", context.lat, "Long: ", context.lng);
            context.lat = r.data.results[0].geometry.location.lat;
            context.lng = r.data.results[0].geometry.location.lng;
            console.log(r.data.results[0]);
            console.log("Lat: ", context.lat, "Long: ", context.lng);
          } else {
            console.log(r.data.error_message);
            console.log("Geocoding Error!");
          }
          complete();  
        })
        .catch((e) => {
          console.log(e);
        });
        
        
    }    function getMatchingMusicians(res, req, mysql, context, complete){
        //get query rows with matching userid
        // Construct query--------------------------------------------------------------
        let sql =   "SELECT Users.user_id, Users.fname, Users.lname, Users.demo_link, Users.zip, Instruments.name, Proficiencies.level \
                        FROM Users \
                        LEFT JOIN Instruments ON Users.instrument_id = Instruments.instrument_id\
                        LEFT JOIN Proficiencies ON Users.proficiency_id = Proficiencies.proficiency_id\
                        WHERE lfg = 1 AND LEFT(zip, 2) = LEFT(?, 2) AND Proficiencies.proficiency_id >= ? AND Instruments.name = ?;"
        inserts = [context.zip, context.proficiency, context.instrument];

        // Query and store results------------------------------------------------------
        console.log("SELECT Users.fname, Users.lname, Users.zip, Instruments.name, Proficiencies.level \
        FROM Users \
        LEFT JOIN Instruments ON Users.instrument_id = Instruments.instrument_id\
        LEFT JOIN Proficiencies ON Users.proficiency_id = Proficiencies.proficiency_id\
        WHERE lfg = 1 AND LEFT(zip, 2) = LEFT(" + context.zip + ", 2) AND Proficiencies.proficiency_id >= "+ context.proficiency + " AND Instruments.name = " + context.instrument + ";")
        mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                console.log(results)
                context.matches = results;
                complete();
            }
        });
    }

    function getUsersNames(res, req, mysql, context, complete){
        let sql = "SELECT user_id, fname, lname FROM Users where user_id = ?";
        inserts = [req.params.uid]
        mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                console.log(results)
                context.names = results[0];
                complete();
            }
        });
    }

    //show page
    router.get('/:uid',redirectLogin,function(req,res) {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        const client = new Client({});

        context.jsscripts = ["send_invites.js"];

        context.uid = req.params.uid;
        context.instrument = req.query.instrument;
        context.proficiency = req.query.proficiency;
        context.zip = req.query.zip;

        getMatchingMusicians(res, req, mysql, context, complete);
        getUsersNames(res, req, mysql, context, complete);
        getZip(res, zip, client, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('search', context);
            }
        }
    });

    router.post('/:uid', async (req, res) => {
        let emp = req.body;
        console.log(emp)
        var mysql = req.app.get('mysql');
        try{
            uid = req.params.uid;
            uname = emp.uname;
            desc = emp.description;

            delete emp.uname;
            delete emp.description;
            
            for (musician in emp){
                mysql.pool.query('INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)\
                    VALUES ("? wants you in their band!", ?, 1, ?, 0, ?);', [uname, desc, uid, musician], function(error){
                        if(error){
                            res.write(JSON.stringify(error));
                            res.end(); 
                        }
                });
            }          
        }
        catch{
            res.redirect('/search/' + uid);
        }
        finally{
            res.redirect('/user_profile/' + uid)
        }
    });

    return router;
}();