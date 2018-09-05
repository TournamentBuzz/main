
function connect(username, password) {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: username,
        password: password,
        database: "tournamentbuzz"
    })

    connection.connect()
    return connection;
}

function endConnection(connection) {
    connection.end()
}
