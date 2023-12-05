var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const User = require('./models/user');
const hbs = require('hbs');

// Import authentication
app.use(session({
  secret: 'fall2023jsframeworks',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Load environment variables during development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Export libraries
var config = require('./config/globals')
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var privateRouter = require('./routes/private');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router config
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/private', privateRouter);

// Connect to MongoDB Atlas
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB Atlas connection errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
