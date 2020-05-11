--- Team Band Aid Database Definitions

--- User Entity
CREATE TABLE Users(
    user_id INT AUTO_INCREMENT,
    query_id INT,
    musician_id INT,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    fname VARCHAR(25) NOT NULL,
    lname VARCHAR(25) NOT NULL,
    phone INT NOT NULL,
    social VARCHAR(100),
    zip INT,
    PRIMARY KEY(user_id)
);

--- Queries Entity
CREATE TABLE Queries(
    query_id INT AUTO_INCREMENT,
    radius INT NOT NULL,
    instrument VARCHAR(20) NOT NULL,
    proficiency INT NOT NULL,
    description VARCHAR(500),
    PRIMARY KEY(query_id)
);

--- Musicians Entity
CREATE TABLE Musicians(
    musician_id INT AUTO_INCREMENT,
    instrument_id INT NOT NULL,
    lfg BOOLEAN,
    demo_link VARCHAR(200),
    PRIMARY KEY(musician_id)
);

--- Instruments Entity
CREATE TABLE Instruments(
    instrument_id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    proficiency INT NOT NULL,
    PRIMARY KEY(instrument_id)
);

--- Messages Entity
CREATE TABLE Messages(
    msg_id INT AUTO_INCREMENT,
    header VARCHAR(200),
    body VARCHAR(500),
    response BOOLEAN,
    PRIMARY KEY(msg_id)
);

--- Bands Entity
CREATE TABLE Bands(
    band_id INT AUTO_INCREMENT,
    name VARCHAR(50),
    bio VARCHAR(500),
    demo_reel VARCHAR(500),
    PRIMARY KEY(band_id)
);

--- User Messages Table for M2M relationship
CREATE TABLE Users_Messages(
    user_id INT NOT NULL,
    msg_id INT NOT NULL,
    PRIMARY KEY(user_id, msg_id)
);

--- Musicians Bands Table for M2M relationship
CREATE TABLE Musicians_Bands(
    band_id INT NOT NULL,
    musician_id INT NOT NULL,
    PRIMARY KEY(band_id, musician_id)
);

--- Foreign Keys
ALTER TABLE Users
ADD CONSTRAINT fk_user_1
FOREIGN KEY (query_id) 
REFERENCES Queries(query_id)
ON DELETE CASCADE;

ALTER TABLE Users
ADD CONSTRAINT fk_user_2
FOREIGN KEY (musician_id) 
REFERENCES Musicians(musician_id)
ON DELETE CASCADE;

ALTER TABLE Musicians
ADD CONSTRAINT fk_musician_1
FOREIGN KEY (instrument_id) 
REFERENCES Instruments(instrument_id)
ON DELETE CASCADE;

ALTER TABLE Users_Messages
ADD CONSTRAINT fk_user_messages_1
FOREIGN KEY (user_id)
REFERENCES Users(user_id)
ON DELETE CASCADE;

ALTER TABLE Users_Messages
ADD CONSTRAINT fk_user_messages_2
FOREIGN KEY (msg_id)
REFERENCES Messages(msg_id)
ON DELETE CASCADE;

ALTER TABLE Musicians_Bands
ADD CONSTRAINT fk_musicians_bands_1
FOREIGN KEY (band_id)
REFERENCES Bands(band_id)
ON DELETE CASCADE;

ALTER TABLE Musicians_Bands
ADD CONSTRAINT fk_musicians_bands_2
FOREIGN KEY (musician_id)
REFERENCES Musicians(musician_id)
ON DELETE CASCADE;


------------------------------------------------------------------
-- SAMPLE DATA
------------------------------------------------------------------

INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES ('user1@gmail.com', 'password', 'Bob', 'Jones', '123456789','60523');

INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES ('user2@gmail.com', 'password2', 'Dave', 'Jones', '123456789','99999');

INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES ('user3@gmail.com', 'password3', 'Betty', 'Bop', '123456789','11111');

INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES ('user4@gmail.com', 'password4', 'Mike', 'Mustache', '123456789','60523');

INSERT INTO Users (email, password, fname, lname, phone, zip)
VALUES ('user5@gmail.com', 'password5', 'Sally', 'Sandal', '123456789','99999');



INSERT INTO Queries (radius, instrument, proficiency, description)
VALUES ('5', 'Guitar', '5', 'Rock gig');

INSERT INTO Queries (radius, instrument, proficiency, description)
VALUES ('20', 'Piano', '9', 'Looking for someone to accompany a vocalist');

INSERT INTO Queries (radius, instrument, proficiency, description)
VALUES ('15', 'Drums', '7', 'Play with our band in some clubs');

INSERT INTO Queries (radius, instrument, proficiency, description)
VALUES ('530', 'Voice', '10', 'Looking to add a member for our tour');

INSERT INTO Queries (radius, instrument, proficiency, description)
VALUES ('20', 'Bass', '3', 'Lets jam out man');



INSERT INTO Instruments (name, proficiency)
VALUES ('guitar', '7');

INSERT INTO Instruments (name, proficiency)
VALUES ('voice', '6');

INSERT INTO Instruments (name, proficiency)
VALUES ('drums', '2');

INSERT INTO Instruments (name, proficiency)
VALUES ('piano', '5');

INSERT INTO Instruments (name, proficiency)
VALUES ('keytar', '9');



INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('1', 'soundcloud.com', '1');

INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('1', 'soundcloud.com', '2');

INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('0', 'soundcloud.com', '3');

INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('1', 'soundcloud.com', '4');

INSERT INTO Musicians (lfg, demo_link, instrument_id)
VALUES ('1', 'soundcloud.com', '5');



INSERT INTO Bands (name, bio, demo_reel)
VALUES ('The Bugs', 'Our music will bug you', 'soundcloud.com');

INSERT INTO Bands (name, bio, demo_reel)
VALUES ('Wind', 'Our music will blow you away', 'soundcloud.com');

INSERT INTO Bands (name, bio, demo_reel)
VALUES ('The Heavywaits', 'Our music is weigh cool', 'soundcloud.com');

INSERT INTO Bands (name, bio, demo_reel)
VALUES ('Monolith', 'Our music will rock you', 'soundcloud.com');

INSERT INTO Bands (name, bio, demo_reel)
VALUES ('The Stroodles', 'Our music is oodles of fun', 'soundcloud.com');



INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('3', '2');

INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('2', '2');

INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('3', '3');

INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('2', '4');

INSERT INTO Musicians_Bands (band_id, musician_id)
VALUES ('3', '5');




INSERT INTO Messages (header, body, response)
VALUES ('Looking for guitarists', 'Must be okayish', '0');

INSERT INTO Messages (header, body, response)
VALUES ('Looking for vocalists', 'Payment through exposure', '1');

INSERT INTO Messages (header, body, response)
VALUES ('Looking for pianists', 'Please teach me for free', '0');

INSERT INTO Messages (header, body, response)
VALUES ('Looking for drummers', 'Eating chicken doesnt count', '0');

INSERT INTO Messages (header, body, response)
VALUES ('Looking for keytarists', 'Do you exist?', '0');



INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('1', '1');

INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('2', '1');

INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('3', '3');

INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('4', '5');

INSERT INTO Users_Messages (user_id, msg_id)
VALUES ('4', '2');