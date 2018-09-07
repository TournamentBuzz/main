var mysql = require('mysql');

function connect(username, password) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: username,
        password: password,
        database: "tournamentbuzz"
    });
    connection.connect();
    return connection;
}

function endConnection(connection) {
    connection.end();
}

module.exports = {
    connect: connect,
    endConnection: endConnection
};