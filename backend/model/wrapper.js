var bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(connection, uname, email, password, admin) {
    return bcrypt.hash(password, saltRounds).then(function(hash) {
        const query = 'INSERT INTO users(email, password, userName, admin) VALUES(?, ?, ?, ?)';
        return new Promise(function(resolve, reject) {
            connection.query(query, [email, hash, uname, admin], function(err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}

async function userExists(connection, email) {
    const query = 'SELECT userName FROM users WHERE email = ?;';
    return new Promise(function(resolve, reject) {
        connection.query(query, [email], function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows.length > 0);
            }
        });
    });
}

async function checkCredentials(connection, email, password) {
    const query = 'SELECT password FROM users WHERE email = ?;';
    return new Promise(function(resolve, reject) {
        connection.query(query, [email], function(err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }).then(function(rows) {
        if (rows.length > 0) {
            return bcrypt.compare(password, rows[0].password);
        } else {
            return false;
        }
    });
};

async function executeSQL(connection, sql) {
    return new Promise(function(resolve, reject) {
        connection.query(sql, function(err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows, fields);
            }
        });
    });
}

module.exports = {
    checkCredentials: checkCredentials,
    createUser: createUser,
    userExists: userExists,
    executeSQL: executeSQL
};