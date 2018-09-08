const mysql = require('mysql');

function connect(host, username, password, database) {
    const connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    });
    connection.connect();
    return connection;
}

module.exports = {
    connect: connect,
};