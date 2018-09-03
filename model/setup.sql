CREATE SCHEMA tournamentbuzz;
USE tournamentbuzz;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL UNIQUE CHECK(email REGEXP '^[A-Za-z0-9][A-Za-z0-9]*@[A-Za-z0-9][A-Za-z0-9]*\\.[A-Za-z0-9]*$'),
  passw VARCHAR(255) NOT NULL CHECK(passw LIKE '%________%'),
  uname VARCHAR(60),
  admin BOOL DEFAULT FALSE NOT NULL, 
  PRIMARY KEY(email)
);

CREATE TABLE tournaments (
	id INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
    creator VARCHAR(255) NOT NULL,
    sponsor VARCHAR(255) DEFAULT NULL,
    teamEvent BOOL NOT NULL DEFAULT FALSE,
    location VARCHAR(255) DEFAULT NULL,
    scoringType ENUM('Points') NOT NULL DEFAULT 'Points',
    tname VARCHAR(255) DEFAULT NULL,
    bracketType ENUM('Single Elim', 'Double Elim', 'Round-robin') NOT NULL DEFAULT 'Single Elim',
    entryCost INT(5) NOT NULL DEFAULT 0,
    maxParticipants INT(5) NOT NULL DEFAULT 16,
    startDate DATE DEFAULT NULL,
    endDate DATE DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(creator)
    REFERENCES users(email)
);

CREATE TABLE matches (
	id INT(12) NOT NULL UNIQUE AUTO_INCREMENT,
    location VARCHAR(255) DEFAULT NULL,
    score VARCHAR(255) DEFAULT NULL,
    mtime DATETIME DEFAULT NULL,
    mname VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE teams (
	id INT(12) NOT NULL UNIQUE AUTO_INCREMENT,
    tname VARCHAR(255) CHECK(NOT EXISTS(SELECT * FROM teamparticipates WHERE teamname = tname)),
    leader VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(leader)
    REFERENCES users(email)
);

CREATE TABLE members (
	uemail VARCHAR(255) NOT NULL,
    teamId INT(12) NOT NULL,
	PRIMARY KEY(uemail, teamId),
    FOREIGN KEY(uemail)
    REFERENCES users(email),
    FOREIGN KEY(teamId)
    REFERENCES teams(id)
);

CREATE TABLE partof (
	uemail VARCHAR(255) NOT NULL,
    tournamentId INT(12) NOT NULL,
    role ENUM('Organizer', 'Referee', 'Participant') DEFAULT 'Participant' NOT NULL,
    seed INT(4) DEFAULT -1,
    FOREIGN KEY(uemail)
    REFERENCES users(email),
    FOREIGN KEY(tournamentId)
    REFERENCES tournaments(id),
    PRIMARY KEY(uemail, tournamentId)
);

CREATE TABLE userparticipates (
	uemail VARCHAR(255) NOT NULL,
    matchId INT(12) NOT NULL,
	PRIMARY KEY(uemail, matchId),
    FOREIGN KEY(uemail)
    REFERENCES users(email),
    FOREIGN KEY(matchId)
    REFERENCES matches(id)
);

CREATE TABLE teamparticipates (
	teamId INT(12) NOT NULL,
    matchId INT(12) NOT NULL,
	PRIMARY KEY(teamId, matchId),
    FOREIGN KEY(teamId)
    REFERENCES teams(id),
    FOREIGN KEY(matchId)
    REFERENCES matches(id)
);

''' Data Tests
INSERT INTO users VALUES("dli357@gatech.edu", "xXxhaxx0rxXx", "Dennis Li", TRUE);
SELECT * FROM users WHERE email = 'dli357@gatech.edu' AND passw = 'xXxhaxx0rxXx'
'''

''' !!!! Warning Kill Switch !!!! Use to clear tables
drop schema tournamentbuzz
'''