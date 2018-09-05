var bcrypt = require('bcrypt')
const saltRounds = 10

function createUser(connection, uname, email, password, admin) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
        var query = 'INSERT INTO users VALUES(' + email + ', ' + hash + ', ' + uname +  ', ' + admin + ')'
        connection.query(query, function (err, rows, fields) {
            if (err) {
                throw "Failed to execute create user SQL"
            } else {
                return true
            }
        })
    })
}

function userExists(connection, email) {
    var query = 'SELECT uname FROM users WHERE email = ' + email
    connection.query(query, function (err, rows, fields) {
        if (err) {
            throw "Failed to execute user exists SQL"
        }
        return (rows.count > 0)
    })
}

function shouldLogin(connection, email, password) {
    var query = 'SELECT passw FROM users WHERE email = ' + email
    connection.query(query, function (err, rows, fields) {
        if (err) {
            throw "Failed to execute login check SQL"
        }
        if (rows.length > 0) {
            bcrypt.compare(password, rows[0], function(err, res) {
                return res
            })
        }
        return false
    })
}

function executeSQL(connection, sql, callBack) {
    connection.query(sql, callBack(err, rows, fields))
}
