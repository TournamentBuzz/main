CREATE SCHEMA tournamentbuzz;
USE tournamentbuzz;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL UNIQUE CHECK(email REGEXP '^[A-Za-z0-9][A-Za-z0-9]*@[A-Za-z0-9][A-Za-z0-9]*\\.[A-Za-z0-9]*$'),
  password VARCHAR(255) NOT NULL CHECK(passw LIKE '%________%'),
  username VARCHAR(60),
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
    tournamentName VARCHAR(255) DEFAULT NULL,
    tournamentType ENUM('Single Elim', 'Double Elim', 'Round-robin') NOT NULL DEFAULT 'Single Elim',
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
    matchTime DATETIME DEFAULT NULL,
    matchName VARCHAR(255) DEFAULT NULL,
    tournament INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(tournament)
    REFERENCES tournaments(id)
);

CREATE TABLE teams (
	id INT(12) NOT NULL UNIQUE AUTO_INCREMENT,
    teamName VARCHAR(255) CHECK(NOT EXISTS(SELECT * FROM teamparticipates WHERE teamname = tname)),
    leader VARCHAR(255) NOT NULL,
    tournament INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(leader)
    REFERENCES users(email),
    FOREIGN KEY(tournament)
    REFERENCES tournaments(id)
);

CREATE TABLE teamMembers (
	userEmail VARCHAR(255) NOT NULL,
    teamId INT(12) NOT NULL,
    invited BOOL NOT NULL DEFAULT FALSE,
    approved BOOL NOT NULL DEFAULT FALSE,
	PRIMARY KEY(userEmail, teamId),
    FOREIGN KEY(userEmail)
    REFERENCES users(email),
    FOREIGN KEY(teamId)
    REFERENCES teams(id)
);

CREATE TABLE participates (
	userEmail VARCHAR(255) NOT NULL,
    tournamentId INT(12) NOT NULL,
    userRole ENUM('Organizer', 'Referee', 'Participant') DEFAULT 'Participant' NOT NULL,
    seed INT(4) DEFAULT NULL,
    FOREIGN KEY(userEmail)
    REFERENCES users(email),
    FOREIGN KEY(tournamentId)
    REFERENCES tournaments(id),
    PRIMARY KEY(userEmail, tournamentId)
);

CREATE TABLE userPlays (
	userEmail VARCHAR(255) NOT NULL,
    matchId INT(12) NOT NULL,
	PRIMARY KEY(userEmail, matchId),
    FOREIGN KEY(userEmail)
    REFERENCES users(email),
    FOREIGN KEY(matchId)
    REFERENCES matches(id)
);

CREATE TABLE teamPlays (
	teamId INT(12) NOT NULL,
    matchId INT(12) NOT NULL,
	PRIMARY KEY(teamId, matchId),
    FOREIGN KEY(teamId)
    REFERENCES teams(id),
    FOREIGN KEY(matchId)
    REFERENCES matches(id)
);
