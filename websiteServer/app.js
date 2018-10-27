var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cinemasesRouter = require('./routes/cinemases');
var hotRouter = require('./routes/hot');
var informationsRouter = require('./routes/informations');
var matchingsRouter = require('./routes/matchings');
var moviesRouter = require('./routes/movies');
var stayRouter = require('./routes/stay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'love',
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:60*60*1000}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cinemases', cinemasesRouter);
app.use('/hot', hotRouter);
app.use('/informations', informationsRouter);
app.use('/matchings', matchingsRouter);
app.use('/movies', moviesRouter);
app.use('/stay', stayRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // console.log("error",err);
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
