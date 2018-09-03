function createUser(connection, name, email, password, admin) {
    // needs password hashing
    var query = 'INSERT INTO users VALUES(' + email + ', ' + password + ', ' + name +  ', ' + admin + ')'
    connection.query(query, function (err, rows, fields) {
        if (err) {
            return false
        } else {
            return true
        }
    })
}

function userExists(connection, email, password) {
    // needs password hashing
    var query = 'SELECT * FROM users WHERE email = ' + email + ' AND passw = ' + password
    connection.query(query, function (err, rows, fields) {
        return rows.length
    })
}