module.exports = {
    serverConfig : {
        "env" : 'development',
        "port" : process.env.PORT || '8080'
    },
    authConfig : {
        "authKey" : process.env.AUTH_EC_KEY || 'testsecret',
        "expiresIn" : '15m'
    },
    databaseConfig: {
    	"username" : process.env.DB_USERNAME, 
    	"password" : process.env.DB_PASSWORD
    }
};
