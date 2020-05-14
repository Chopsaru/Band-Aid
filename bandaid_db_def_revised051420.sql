--- Team Band Aid Database Definitions

--- User Entity
CREATE TABLE Users(
    user_id INT AUTO_INCREMENT NOT NULL,
    instrument_id INT,
    proficiency_id INT,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    fname VARCHAR(25) NOT NULL,
    lname VARCHAR(25) NOT NULL,
    phone INT,
    social VARCHAR(100),
    zip INT NOT NULL,
    lfg BOOLEAN NOT NULL,
    PRIMARY KEY(user_id)
);

--- Instruments Entity
CREATE TABLE Instruments(
    instrument_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(instrument_id)
);

--- Proficiencies Entity
CREATE TABLE Proficiencies(
    proficiency_id INT AUTO_INCREMENT NOT NULL,
    level VARCHAR(20) NOT NULL,
    PRIMARY KEY(proficiency_id)
);

--- Messages Entity
CREATE TABLE Messages(
    msg_id INT AUTO_INCREMENT NOT NULL,
    header VARCHAR(200),
    body VARCHAR(500),
    responsed BOOLEAN,
    PRIMARY KEY(msg_id)
);

--- User <-> Messages Intermediaty M:M Table
CREATE TABLE Users_Messages(
    user_id INT NOT NULL,
    msg_id INT NOT NULL,
    PRIMARY KEY(user_id, msg_id)
);

ALTER TABLE Users
ADD CONSTRAINT fk_user_1
FOREIGN KEY (instrument_id) 
REFERENCES Instruments(instrument_id)
ON DELETE CASCADE;

ALTER TABLE Users
ADD CONSTRAINT fk_user_2
FOREIGN KEY (proficiency_id) 
REFERENCES Proficiencies(proficiency_id)
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


------------------------------------------------------------------
-- SAMPLE DATA
------------------------------------------------------------------

INSERT INTO Users (email, password, fname, lname, phone, zip, lfg)
VALUES ('user1@gmail.com', 'password', 'Bob', 'Jones', '123456789','60523', 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lfg)
VALUES ('user2@gmail.com', 'password2', 'Dave', 'Jones', '123456789','99999', 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lfg)
VALUES ('user3@gmail.com', 'password3', 'Betty', 'Bop', '123456789','11111', 0);

INSERT INTO Users (email, password, fname, lname, phone, zip, lfg)
VALUES ('user4@gmail.com', 'password4', 'Mike', 'Mustache', '123456789','60523', 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lfg)
VALUES ('user5@gmail.com', 'password5', 'Sally', 'Sandal', '123456789','99999', 1);



INSERT INTO Instruments (name)
VALUES ('Guitar');

INSERT INTO Instruments (name)
VALUES ('Voice');

INSERT INTO Instruments (name)
VALUES ('Drums');

INSERT INTO Instruments (name)
VALUES ('Piano');

INSERT INTO Instruments (name)
VALUES ('Keytar');



INSERT INTO Instruments (name)
VALUES ('Amatuer');

INSERT INTO Instruments (name)
VALUES ('Intermediate');

INSERT INTO Instruments (name)
VALUES ('Expert');

INSERT INTO Instruments (name)
VALUES ('Master');

INSERT INTO Instruments (name)
VALUES ('Professional');



INSERT INTO Messages (header, body, responsed)
VALUES ('Looking for guitarists', 'Must be okayish', '0');

INSERT INTO Messages (header, body, responsed)
VALUES ('Looking for vocalists', 'Payment through exposure', '1');

INSERT INTO Messages (header, body, responsed)
VALUES ('Looking for pianists', 'Please teach me for free', '0');

INSERT INTO Messages (header, body, responsed)
VALUES ('Looking for drummers', 'Eating chicken doesnt count', '0');

INSERT INTO Messages (header, body, responsed)
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