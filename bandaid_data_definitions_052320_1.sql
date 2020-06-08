--- Team Band Aid Database Definitions 5/14/20

--- User Entity
CREATE TABLE Users(
    user_id INT AUTO_INCREMENT NOT NULL,
    instrument_id INT,
    proficiency_id INT,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    fname VARCHAR(25) NOT NULL,
    lname VARCHAR(25) NOT NULL,
    phone BIGINT(11),
    social VARCHAR(255),
    zip INT NOT NULL,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    lfg BOOLEAN NOT NULL,
    demo_link VARCHAR(255),
    profile_image VARCHAR(255),
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
    header VARCHAR(255),
    body VARCHAR(510),
    req_response BOOLEAN,
    sender_id INT,
    read_bool BOOLEAN,
    inbox_id INT,
    PRIMARY KEY(msg_id)
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

ALTER TABLE Messages
ADD CONSTRAINT fk_messages_1
FOREIGN KEY (inbox_id)
REFERENCES Users(user_id)
ON DELETE CASCADE;

------------------------------------------------------------------
-- SAMPLE DATA
------------------------------------------------------------------

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


INSERT INTO Proficiencies (level)
VALUES ('Amatuer');

INSERT INTO Proficiencies (level)
VALUES ('Intermediate');

INSERT INTO Proficiencies (level)
VALUES ('Expert');

INSERT INTO Proficiencies (level)
VALUES ('Master');

INSERT INTO Proficiencies (level)
VALUES ('Professional');


INSERT INTO Users (email, password, fname, lname, phone, zip, lat, lng, lfg, social, demo_link, proficiency_id, instrument_id)
VALUES ('user1@gmail.com', '$2b$10$QQxAR4KcUwU9mk8vG2uiTOTchNRo4.u2Ct8pF2fEW1k96t2UEa2re', 'Bob', 'Jones', '123456789','60523', '41.831793', '-87.94328370000001', 1, 'https://www.facebook.com/', 'https://soundcloud.com/', 2, 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lat, lng, lfg, social, demo_link, proficiency_id, instrument_id)
VALUES ('user2@gmail.com', '$2b$10$0jPvzJlIr4lo2XOaPODxm.kvLDjnO/dc/0RCvim0qvEu2/IwhKFK2', 'Dave', 'Jones', '123456789','60564', '41.7074', '-88.2014', 1, 'https://www.facebook.com/', 'https://soundcloud.com/', 2, 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lat, lng, lfg, social, demo_link, proficiency_id, instrument_id)
VALUES ('user3@gmail.com', '$2b$10$rZpvonyqttD9mYfx.Gj/.OvW46lo0/Ydy1VMDnXEx5VbwiWtsiTZS', 'Betty', 'Bop', '123456789','53205', '43.053', '-87.9328', 0, 'https://www.facebook.com/', 'https://soundcloud.com/', 4, 1);

INSERT INTO Users (email, password, fname, lname, phone, zip, lat, lng, lfg, social, demo_link, proficiency_id, instrument_id)
VALUES ('user4@gmail.com', '$2b$10$um5J7b2GWVXtgK85iX5B3.GMVCsi5CMTo6NzLYYXgMIzGAeTevkxG', 'Mike', 'Mustache', '123456789','49505', '42.9971', '-85.6411', 1, 'https://www.facebook.com/', 'https://soundcloud.com/', 3, 3);

INSERT INTO Users (email, password, fname, lname, phone, zip, lat, lng, lfg, social, demo_link, proficiency_id, instrument_id)
VALUES ('user5@gmail.com', '$2b$10$89m9BrxckILExfUhtzJCeutOO2JALvUWUje4jDKe/A6v9jcD3za16', 'Sally', 'Sandal', '123456789','46404', '41.5872', '-87.3729', 1, 'https://www.facebook.com/', 'https://soundcloud.com/', 5, 4);


INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Looking for guitarists', 'Must be okayish', 0, 3, 0, 1);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Looking for vocalists', 'Payment through exposure', 1, 3, 1, 2);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Looking for pianists', 'Please teach me for free', 0, 3, 0, 4);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Looking for drummers', 'Eating chicken doesnt count', 0, 1, 3, 3);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Looking for keytarists', 'Do you exist?', 0, 2, 0, 4);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Invite Sent!', NULL, NULL, NULL, 1, 3);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Invite Sent!', NULL, NULL, NULL, 1, 3);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Invite Sent!', NULL, NULL, NULL, 0, 3);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Invite Sent!', NULL, NULL, NULL, 0, 2);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('Invite Sent!', NULL, NULL, NULL, 1, 1);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('*User* wants to join your band!', 'Here is his contact info _________', NULL, 2, 1, 3);

INSERT INTO Messages (header, body, req_response, sender_id, read_bool, inbox_id)
VALUES ('*User* wants to join your band!', 'Here is his contact info _________', NULL, 1, 1, 1);
