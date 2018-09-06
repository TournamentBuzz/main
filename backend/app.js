var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config');

var user = require('./controllers/user');

var app = express();

// set running environment
app.set('env', config.serverConfig.env);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send back error
    err.status = err.status || 500;
    
    // don't leak error if not in development
    if (req.app.get('env') !== 'development' && err.status === 500) {
        err.message = 'Internal Server Error';
    }
    res.status(err.status);
    res.send(JSON.stringify({status: err.status, message: err.message}));
});

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

var port = config.serverConfig.port;
app.listen(port);
console.log('Server running at port ' + port);

module.exports = app;