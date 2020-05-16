--- USERS ---

--- READ
SELECT  instrument_id,
        proficiency_id,
        email,
        fname,
        lname,
        phone,
        social,
        zip,
        lfg,
        demo_link
FROM    Users 
WHERE   user_id = :user_id;

--- ADD
INSERT INTO Users (instrument_id, proficiency_id, email, fname, lname, phone, social, zip, lfg, demo_link)
VALUES ('instrument_id_input', 'proficiency_id_input', 'email_input', 'fname_input', 'lname_input', 'phone_input', 'social_input', 'zip_input', 'lfg_input', 'demo_link_input');

--- DELETE
DELETE FROM Users WHERE user_id = :user_id;

--- UPDATE
UPDATE Users
SET     instrument_id = 'instrument_id_input',
        proficiency_id = 'proficiency_id_input',
        email = 'email_input',
        fname = 'fname_input',
        lname = 'lname_input',
        phone = 'phone_input',
        social = 'social_input',
        zip = 'zip_input',
        lfg = 'lfg_input',
        demo_link = 'demo_link_input'
WHERE user_id = :user_id;


--- INSTRUMENTS ---

--- READ
SELECT  name,
        level
FROM    Instruments 
WHERE   instrument_id = :instrument_id;

--- ADD
INSERT INTO Instruments (name, level)
VALUES ('name_input', 'level_input');

--- DELETE
DELETE FROM Instruments WHERE instrument_id = :instrument_id;

--- UPDATE
UPDATE Instruments
SET     name = ':name_input',
        level = ':level_input'
WHERE instrument_id = :instrument_id;


--- PROFICIENCIES ---

--- READ
SELECT  level
FROM    Proficiencies 
WHERE   proficiency_id = :proficiency_id;

--- ADD
INSERT INTO Proficiencies (name, level)
VALUES ('level_input');

--- DELETE
DELETE FROM Proficiencies WHERE proficiency_id = :proficiency_id;

--- UPDATE
UPDATE Proficiencies
SET     level = ':level_input'
WHERE proficiency_id = :proficiency_id;


--- MESSAGES ---

--- READ
SELECT  header,
        body,
        responsed
FROM    Messages 
WHERE   msg_id = :msg_id;

--- ADD
INSERT INTO Messages (header, body, responsed)
VALUES ('header_input', 'body_input', 'response_input');

--- DELETE
DELETE FROM Messages WHERE msg_id = :msg_id;

--- UPDATE
UPDATE Messages
SET     header = 'header_input',
        body = 'body_input',
        responsed = 'response_input'
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