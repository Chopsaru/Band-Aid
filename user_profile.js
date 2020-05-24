
//-------------------------------------------user profile landing page--------------------------------------------------
module.exports = function () {
    var express = require('express');
    var router = express.Router();

    //----------------------------------------------- session handlers -----------------------------------------------------
    // handles user if not signed in
    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
            res.redirect('/login')
        } else {
            next()
        }
    }

    // handles user if signed in
    const redirectUser_Profile = (req, res, next) => {
        if (req.session.userId) {
            res.redirect('/user_profile/' + req.session)
        } else {
            next()
        }
    }

    //--------------------------------------- get single user profile data -------------------------------------------------

    function getUserProfile(res, mysql, context, id, complete) {

        // Construct query--------------------------------------------------------------
        var sql = "SELECT user_id as id, fname, lname, name as insName, level as insProficiency, email, password, phone, social, zip, lfg, demo_link\n" +
            "FROM Users\n" +
            "INNER JOIN Instruments\n" +
            "ON Users.instrument_id = Instruments.instrument_id\n" +
            "INNER JOIN Proficiencies \n" +
            "ON Users.proficiency_id = Proficiencies.proficiency_id WHERE user_id = ?";
        var inserts = [id];
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user_profile = results[0];
            complete();
        });
    }

    //--------------------------------------- get user messages -------------------------------------------------

    function getMessages(res, mysql, context, id, complete) {

        var sql = "SELECT * from Messages WHERE req_response = 1 AND inbox_id = ?";
        var inserts = [id];
        console.log("SELECT * from Messages WHERE req_response = 1 AND inbox_id = ? " + id);
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            console.log(results)
            context.messages = results;
            complete();
        });
    }
    //--------------------------------------- get sent messages -------------------------------------------------

    function getSentMessages(res, mysql, context, id, complete) {

        var sql = "SELECT * from Messages WHERE sender_id = ?";
        var inserts = [id];
        console.log("SELECT * from Messages WHERE sender_id = ? " + id);

        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log('made it here')
            console.log(results)
            context.sent = results;
            complete();
        });
    }
    //--------------------------------------- get pending messages -------------------------------------------------

    function getRespondedMessages(res, mysql, context, id, complete) {

        var sql = "SELECT * from Messages WHERE req_response = 0 AND inbox_id = ?";
        var inserts = [id];
        console.log("SELECT * from Messages WHERE req_response = 0 AND inbox_id = ? " + id);
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, inserts, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            console.log(results)
            context.responded = results;
            complete();
        });
    }

    //--------------------------------------- get list of instruments -------------------------------------------------

    function getInstruments(res, mysql, context, complete) {

        mysql.pool.query("SELECT instrument_id as id, name as insName FROM Instruments", function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments = results;
            console.log(results);
            complete();
        });
    }

    //--------------------------------------- get list of proficiencies -------------------------------------------------

    function getProficiency(res, mysql, context, complete) {

        // Construct query--------------------------------------------------------------
        var sql = "SELECT proficiency_id as id, level as insProficiency FROM Proficiencies";
        // Query and store results------------------------------------------------------
        mysql.pool.query(sql, function (error, results) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.proficiencies = results;
            complete();
        });
    }

    //------------------------------------------ get and display single user -----------------------------------------------

    router.get('/:id', redirectLogin, function (req, res) {
        console.log(req.session);
        console.log(req.session.userId);

        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js", "delete_user_profile.js"];
        var mysql = req.app.get('mysql');




        // get all data for update
        getUserProfile(res, mysql, context, req.session.userId, complete);
        // get all messages where id matches
        getMessages(res, mysql, context, req.params.id, complete);
        console.log("here")
        getSentMessages(res, mysql, context, req.params.id, complete);
        getRespondedMessages(res, mysql, context, req.params.id, complete);





        console.log("Made it back to redirect")
        function complete() {
            callbackCount++;
            if (callbackCount >= 4) {
                res.render('user_profile', context);
            }
        }
    });

    //----------------------------------- get and display single user for editing ------------------------------------------

    router.get('/edit/:id', redirectLogin, function (req, res) {
        console.log(req.session);
        console.log(req.session.userId);

        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js", "delete_user_profile.js"];
        var mysql = req.app.get('mysql');

        // get all data for update
        getUserProfile(res, mysql, context, req.params.id, complete);
        // get instruments to select from
        getInstruments(res, mysql, context, complete);
        // get instruments to select from
        getProficiency(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('edit_user_profile', context);
            }
        }
    });

    //----------------------------------- change password page ####not functioning yet######--------------------------------

    router.get('/edit/password/:id', redirectLogin, function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["edit_user_profile.js", "delete_user_profile.js"];
        var mysql = req.app.get('mysql');

        getUserProfile(res, mysql, context, req.params.id, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update_password', context);
            }
        }
    });

    //----------------------------------- updates database for user_profile change -----------------------------------------
    //Need to get instrument, skill level, and gig going #############################################

    router.put('/:id', function (req, res) {
        console.log(req.body);
        console.log(req.params.id);
        var mysql = req.app.get('mysql');
        mysql.pool.query("UPDATE Users SET email=?, fname=?, lname=?, phone=?, zip=? WHERE user_id=?",
            [req.body.email, req.body.fname, req.body.lname, req.body.phone, req.body.zip, req.params.id],
            function (error) {
                if (error) {
                    console.log(error);
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    res.status(200);
                    res.end();
                }
            })
            ;
    });

    //--------------------------------------------- delete user profiles ---------------------------------------------------
    router.delete('/:id', function (req, res) {
        console.log("Made it to delete function")
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Users WHERE user_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });
    //--------------------------------------------- respond to messages ---------------------------------------------------
    router.post('/accept', (req, res) => {
        let emp = req.body;
        console.log(emp);

        var callbackCount = 0;
        var mysql = req.app.get('mysql');

        //get query params
        mysql.pool.query("SELECT inbox_id, sender_id, fname, lname, phone, social FROM Messages\
                                INNER JOIN Users\
                                ON Users.user_id = Messages.sender_id\
                                WHERE msg_id = ?;",
            [emp.msg_id],
            function (error, results) {
                if (error) {
                    console.log(error);
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    //insert message into musicians inbox w/ contact info
                    var mresults = results[0];
                    console.log(mresults)
                    mysql.pool.query('INSERT INTO Messages (header, body, inbox_id, sender_id, req_response)\
                                             VALUES ("? ? has accepted your invitation!",\
                                             "Here is their contact information: Phone - ? Social - ?",\
                                             ?, ?, 0);',
                        [mresults.fname, mresults.lname, mresults.phone, mresults.social, mresults.sender_id, mresults.inbox_id],
                        function (error) {
                            if (error) {
                                console.log(error);
                                res.write(JSON.stringify(error));
                                res.end();
                            } else {
                                complete()
                            }
                        })
                    //set required response flag to false
                    mysql.pool.query('UPDATE Messages SET req_response = 0 WHERE msg_id = ?', [emp.msg_id], function (error) {
                        if (error) {
                            console.log(error);
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            complete()
                        }
                    })
                }
            })

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                console.log("made it to end")
                res.status(200).end();
            }
        }
    });


    router.post('/decline', (req, res) => {
        let emp = req.body;
        console.log(emp);

        var callbackCount = 0;
        var mysql = req.app.get('mysql');

        //get query params
        mysql.pool.query("SELECT inbox_id, sender_id, fname, lname FROM Messages\
                                INNER JOIN Users\
                                ON Users.user_id = Messages.sender_id\
                                WHERE msg_id = ?;",
            [emp.msg_id],
            function (error, results) {
                if (error) {
                    console.log(error);
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    //insert message into musicians inbox w/ contact info
                    var mresults = results[0];
                    console.log(mresults)
                    mysql.pool.query('INSERT INTO Messages (header, inbox_id, sender_id, req_response)\
                                             VALUES ("? ? has declined your invitation.", ?, ?, 0);',
                        [mresults.fname, mresults.lname, mresults.sender_id, mresults.inbox_id],
                        function (error) {
                            if (error) {
                                console.log(error);
                                res.write(JSON.stringify(error));
                                res.end();
                            } else {
                                complete()
                            }
                        })
                    //set required response flag to false
                    mysql.pool.query('UPDATE Messages SET req_response = 0 WHERE msg_id = ?', [emp.msg_id], function (error) {
                        if (error) {
                            console.log(error);
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            complete()
                        }
                    })
                }
            })

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                console.log("made it to end")
                res.status(200).end();
            }
        }
    });

    return router;
}(); 
