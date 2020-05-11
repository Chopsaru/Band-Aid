--- USERS ---

--- READ
SELECT  query_id,
        musician_id,
        email,
        fname,
        lname,
        phone,
        social,
        zip
FROM    Users 
WHERE   user_id = :user_id;

--- ADD
INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES (':email_input', ':password_input', ':fname_input', ':lname_input', 'phone_input', 'zip_input');

--- DELETE
DELETE FROM Users WHERE user_id = :user_id;

--- UPDATE
UPDATE Users
SET     query_id = 'query_id_input',
        musician_id = 'musician_id_input',
        email = 'email_input',
        fname = 'fname_input',
        lname = 'lname_input',
        phone = 'phone_input',
        social = 'social_input',
        zip = 'zip_input'
WHERE user_id = :user_id;



--- QUERIES ---

--- READ
SELECT  radius,
        instrument,
        proficency,
        description
FROM    Queries 
WHERE   query_id = :query_id;

--- ADD
INSERT INTO Queries (radius, instrument, proficency, description)
VALUES (':radius_input', ':instrument_input', 'proficency_input', 'description_input');

--- DELETE
DELETE FROM Queries WHERE query_id = :query_id;

--- UPDATE
UPDATE Queries
SET     radius = 'radius_input',
        instrument = 'instrument_input',
        proficency = 'proficency_input',
        description = 'description_input'
WHERE query_id = :query_id;



--- MUSICIANS ---

--- READ
SELECT  lfg,
        demo_link,
        instrument_id
FROM    Musicians 
WHERE   musician_id = :musician_id;

--- ADD
INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('lfg_input', 'demo_link_input', 'instrument_id_input');

--- DELETE
DELETE FROM Musicians WHERE musician_id = :musician_id;

--- UPDATE
UPDATE Musicians
SET     lfg = 'lfg_input',
        demo_link = 'demo_link_input',
        instrument_id = 'instrument_id_input'
WHERE musician_id = :musician_id;


--- BANDS ---

--- READ
SELECT  name,
        bio,
        demo_reel
FROM    Bands 
WHERE   band_id = :band_id;

--- ADD
INSERT INTO Bands (name, bio, demo_reel)
VALUES ('name_input', 'bio_input', 'demo_reel_input');

--- DELETE
DELETE FROM Bands WHERE band_id = :band_id;

--- UPDATE
UPDATE Bands
SET     name = 'name_input',
        bio = 'bio_input',
        demo_reel = 'bio_input'
WHERE band_id = :band_id;


--- MUSICIANS_BANDS ---

--- READ
SELECT  band_id,
        musician_id
FROM    Musicians_Bands 
WHERE   musician_id = :musician_id;

--- ADD
INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('band_id_input', 'musician_id_input');

--- DELETE
DELETE FROM Musicians_Bands WHERE musician_id = :musician_id;

--- UPDATE
UPDATE Musicians_Bands
SET     band_id = 'band_id_input',
        musician_id = 'musician_id_input'
WHERE musician_id = :musician_id;


--- INSTRUMENTS ---

--- READ
SELECT  name,
        proficency
FROM    Instruments 
WHERE   instrument_id = :instrument_id;

--- ADD
INSERT INTO Instruments (name, proficency)
VALUES ('name_input', 'proficency_input');

--- DELETE
DELETE FROM Instruments WHERE instrument_id = :instrument_id;

--- UPDATE
UPDATE Instruments
SET     name = ':name_input',
        proficency = ':proficency_input'
WHERE instrument_id = :instrument_id;


--- MESSAGES ---

--- READ
SELECT  header,
        body,
        response
FROM    Messages 
WHERE   msg_id = :msg_id;

--- ADD
INSERT INTO Messages (header, body, response)
VALUES ('header_input', 'body_input', 'response_input');

--- DELETE
DELETE FROM Messages WHERE msg_id = :msg_id;

--- UPDATE
UPDATE Messages
SET     header = 'header_input',
        body = 'body_input',
        response = 'response_input'
WHERE msg_id = :msg_id;


--- USER_MESSAGES ---

--- READ
SELECT  user_id,
        msg_id
FROM    Users_Messages 
WHERE   msg_id = :msg_id;

--- ADD
INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('user_id_input', 'msg_id_input');

--- DELETE
DELETE FROM Users_Messages WHERE msg_id = :msg_id;

--- UPDATE
UPDATE Users_Messages
SET     user_id = 'user_id_input',
        msg_id = 'msg_id_input'
WHERE msg_id = :msg_id;