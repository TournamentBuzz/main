## Installation

#### Pre-requisites
nodejs >= 8.0  
mysql 5.x

#### Install guide
Clone the Github repository `git clone https://github.com/TournamentBuzz/main.git`  
Go into the frontend folder and run `npm install`  
After all the required modules are installed, run `npm build`  
Copy the files in the build folder into your webroot  
Set the proxy location in package.json to the location of the backend  
Go into the backend folder and run `npm install`  
Create a mysql database with name `tournamentbuzz` and a username and password  
Set the backend environment variables (see config.js)  
Run `npm start` in the backend folder to start the backend  
