module.exports = function(){
    let express = require('express');
    let router = express.Router();
    const {Client, Status} = require("@googlemaps/google-maps-services-js");

    var geoKey = "AIzaSyBv5zGSLMMofgJgzdnNkaL7yiGlDh3NuBM";
    var http = require("https");


    function getZip(res, client, context, complete) {
        client
        .geocode({
          params: {
            address: "60523",
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
        
    }


//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) =>{
        if(!req.session.userId){
            res.redirect('/login')
        } else {
            next()
        }
    }

    //show page
    router.get('/:uid',redirectLogin,function(req,res) {
        let callbackCount = 0;
        let context = {};
        const client = new Client({});

        getZip(res, client, context, complete);


        context.uid = req.params.uid;

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log("Google API request finished. Result:");
                console.log(context.lat, context.lng);        
                res.render('q3', context);
            }
        }

    });

    return router;
}();
