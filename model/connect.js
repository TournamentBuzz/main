var mysql = require('mysql')
var username = prompt("Username")
var password = prompt("Password")
var connection = mysql.createConnection({
    host: 'localhost',
    user: username,
    password: password,
    database: "tournamentbuzz"
})

connection.connect()

connection.query('SELECT * FROM USERS', function (err, rows, fields) {
    console.log(rows[0].solution)
})

connection.end()