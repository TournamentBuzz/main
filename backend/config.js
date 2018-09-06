module.exports = {
    serverConfig : {
        "env" : 'development',
        "port" : process.env.PORT || '8080'
    },
    authConfig : {
        "authKey" : process.env.AUTH_EC_KEY || 'testsecret'
    }
};
