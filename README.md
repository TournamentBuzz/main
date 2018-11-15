# main

To run:

Setup the database:
1. Install MySQL and configure the username and password in the TournamentBuzz environment variables
2. Run the setup.sql script in main/backend/model/ to configure the schema
3. If desired, run testData.sql to populate the database with sample data

Run the backend:
1. cd into the backend folder
2. Run "npm install" if needed
3. Run "npm run test" to run the unit tests or "npm run dev" to run the backend

Run the frontend:
1. cd into the frontend folder
2. Run "npm install" if needed
3. Run "npm start" to run the frontend

Both the frontend and backend need to be running for the application to work, and it should open on localhost:3000. Note that the frontend may take a couple minutes to start up.

