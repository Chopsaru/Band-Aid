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
    instrument VARCHAR(1) NOT NULL,
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