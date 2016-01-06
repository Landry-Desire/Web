var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var friends = require('./routes/friends');
var bills = require('./routes/bills');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routing angular 
/*app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});
app.get('/styles/:name', function (req, res) {
  var name = req.params.name;
  res.render('styles/' + name);
});
app.get('/scripts/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});*/

app.get('/:n', function (req, res){
  res.sendFile(__dirname+'/views/'+n);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"projetweb"}))


app.use(express.static(path.join(__dirname, 'views')));
//app.use(express)

app.use('/', routes);
app.use('/users', users);
app.use('/bills', bills);
app.use('/friends', friends);

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
