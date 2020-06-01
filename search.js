module.exports = function () {
    let express = require('express')
    let router = express.Router()

    const { Client, Status } = require('@googlemaps/google-maps-services-js')
    var geoKey = 'AIzaSyBv5zGSLMMofgJgzdnNkaL7yiGlDh3NuBM'
    var http = require('https')

//----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
            res.redirect('/login')
        } else {
            next()
        }
    }

    function getZip (res, zip, client, context, complete) {
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
                    console.log('Google Geocoding:')
                    console.log('Lat: ', context.lat, 'Long: ', context.lng)
                    context.lat = r.data.results[0].geometry.location.lat
                    context.lng = r.data.results[0].geometry.location.lng
                    console.log(r.data.results[0])
                    console.log('Lat: ', context.lat, 'Long: ', context.lng)
                } else {
                    console.log(r.data.error_message)
                    console.log('Geocoding Error!')
                }
                complete()
            })
            .catch((e) => {
                console.log(e)
            })

    }

    function getMatchingMusicians (res, req, mysql, context, complete) {
        //get query rows with matching userid
        // Construct query--------------------------------------------------------------
        let sql = '\
    SELECT U.user_id, \
      U.fname, \
      U.lname, \
      U.demo_link, \
      U.zip, \
      Instruments.name, \
      Proficiencies.level \
    FROM    (SELECT *, (3959 * acos(cos(radians(?)) * cos(radians(Users.lat)) * cos(radians(Users.lng) - radians(?)) + \
      sin(radians(?)) * sin(radians(Users.lat)))) AS distance FROM Users HAVING distance < ?) U \
    LEFT JOIN Instruments ON U.instrument_id = Instruments.instrument_id \
    LEFT JOIN Proficiencies ON U.proficiency_id = Proficiencies.proficiency_id \
    WHERE lfg = 1 \
    AND Proficiencies.proficiency_id >= ? \
    AND Instruments.name = ?; \
    '
        inserts = [context.lat || 0, context.lng || 0, context.lat || 0, context.distance || 1000, context.proficiency, context.instrument]

        // Query and store results------------------------------------------------------
        console.log('"\n' +
            '    SELECT U.user_id, \n' +
            '      U.fname, \n' +
            '      U.lname, \n' +
            '      U.demo_link, \n' +
            '      U.zip, \n' +
            '      Instruments.name, \n' +
            '      Proficiencies.level \n' +
            '    FROM    (SELECT *, (3959 * acos(cos(radians(' + context.lat + ')) * cos(radians(Users.lat)) * cos(radians(Users.lng) - radians(' + context.lng + ')) + \n' +
            '      sin(radians(' + context.lat + ')) * sin(radians(Users.lat)))) AS distance FROM Users HAVING distance < ' + context.distance + ') U \n' +
            '    LEFT JOIN Instruments ON U.instrument_id = Instruments.instrument_id \n' +
            '    LEFT JOIN Proficiencies ON U.proficiency_id = Proficiencies.proficiency_id \n' +
            '    WHERE lfg = 1 \n' +
            '    AND Proficiencies.proficiency_id >= ' + context.proficiency + ' \n' +
            '    AND Instruments.name = ' + context.instrument + '; \n' +
            '    "')
        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                console.log(results)
                context.matches = results
                complete()
            }
        })
    }

    function getUsersNames (res, req, mysql, context, complete) {
        let sql = 'SELECT user_id, fname, lname FROM Users where user_id = ?'
        inserts = [req.params.uid]
        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                console.log(results)
                context.names = results[0]
                complete()
            }
        })
    }

    //show page
    router.get('/:uid', redirectLogin, function (req, res) {
        let callbackCount = 0
        let context = {}
        let mysql = req.app.get('mysql')
        const client = new Client({})

        context.jsscripts = ['send_invites.js']

        context.uid = req.params.uid

        if (Object.keys(req.query).length > 0) {
            // With actual query params
            context.instrument = req.query.instrument
            context.proficiency = req.query.proficiency
            context.zip = req.query.zip
            context.distance = req.query.zipRadius
            getZip(res, req.query.zip, client, context, function () {
                getMatchingMusicians(res, req, mysql, context, complete)
            })
            getUsersNames(res, req, mysql, context, complete)
        } else {
            // w/o any query params, just entering this page from user profile page
            getMatchingMusicians(res, req, mysql, context, complete)
            getUsersNames(res, req, mysql, context, complete)
        }

        function complete () {
            callbackCount++
            if (callbackCount >= 2) {
                res.render('search', context)
            }
        }
    })

    router.post('/:uid', async (req, res) => {
        let emp = req.body
        console.log(emp)
        var mysql = req.app.get('mysql')
        try {
            uid = req.params.uid
            uname = emp.uname
            desc = emp.description

            delete emp.uname
            delete emp.description

            for (musician in emp) {
                mysql.pool.query('INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)\
                    VALUES ("? wants you in their band!", ?, 1, ?, 0, ?);', [uname, desc, uid, musician], function (error) {
                    if (error) {
                        res.write(JSON.stringify(error))
                        res.end()
                    }
                })
            }
        } catch {
            res.redirect('/search/' + uid)
        } finally {
            res.redirect('/user_profile/' + uid)
        }
    })

    return router
}()