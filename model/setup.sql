CREATE SCHEMA tournamentbuzz;
USE tournamentbuzz;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL UNIQUE CHECK(email REGEXP '^[A-Za-z0-9][A-Za-z0-9]*@[A-Za-z0-9][A-Za-z0-9]*\\.[A-Za-z0-9]*$'),
  passw VARCHAR(255) NOT NULL CHECK(passw LIKE '%________%'),
  uname VARCHAR(60),
  admin BOOL DEFAULT FALSE NOT NULL, 
  PRIMARY KEY(email)
);

INSERT INTO users VALUES("dli357@gatech.edu", "xXxhaxx0rxXx", "Dennis Li", TRUE);
