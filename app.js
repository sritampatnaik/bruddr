var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Grab credentials */
const credentials = require('./config/credentials')

/* Routes init */
var routes = require('./routes/index');
var todos = require('./routes/todos');
var messengerBot = require('./routes/api/v1/messenger-bot');

var app = express();

/* Db connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+credentials.mongoUser+':'+credentials.mongoPW+'@ds013941.mlab.com:13941/bruddr-prod', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Adding route controllers */
app.use('/', routes);
app.use('/todos', todos);

/* Adding API controllers */
app.use('/api/v1/messenger-bot', messengerBot);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
