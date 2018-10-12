CREATE SCHEMA tournamentbuzz;
USE tournamentbuzz;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  userName VARCHAR(60),
  admin BOOL DEFAULT FALSE NOT NULL, 
  PRIMARY KEY(email)
);

CREATE TABLE tournaments (
	id INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
    creator VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    maxTeamSize INT(5) NOT NULL DEFAULT FALSE,
    location VARCHAR(255) DEFAULT NULL,
    scoringType ENUM('Points') NOT NULL DEFAULT 'Points',
    tournamentName VARCHAR(255) DEFAULT NULL,
    tournamentType ENUM('Single Elim', 'Double Elim', 'Round-robin') NOT NULL DEFAULT 'Single Elim',
    entryCost INT(5) NOT NULL DEFAULT 0,
    maxTeams INT(5) NOT NULL DEFAULT 16,
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
    teamName VARCHAR(255),
    leader VARCHAR(255) NOT NULL,
    tournament INT(10) NOT NULL,
    seed INT(4) DEFAULT NULL,
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
    requested BOOL NOT NULL DEFAULT FALSE,
    approved BOOL NOT NULL DEFAULT FALSE,
	PRIMARY KEY(userEmail, teamId),
    FOREIGN KEY(userEmail)
    REFERENCES users(email),
    FOREIGN KEY(teamId)
    REFERENCES teams(id)
);

CREATE TABLE referees (
	userEmail VARCHAR(255) NOT NULL,
    tournamentId INT(12) NOT NULL,
    FOREIGN KEY(userEmail)
    REFERENCES users(email),
    FOREIGN KEY(tournamentId)
    REFERENCES tournaments(id),
    PRIMARY KEY(userEmail, tournamentId)
);

