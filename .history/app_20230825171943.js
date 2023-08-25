var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const corsOptions = require('./config/corsConfig');
const antiXss = require('./middleware/antiXSSMiddleware');
const {rateLimiterMiddleware} = require('./middleware/RedisRateLimiter');
const blogSession = require('./middleware/expressSession');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var loginRouter = require('./routes/loginRouter');
var registerRouter  = require('./routes/registerRouter');
var blogRouter = require('./routes/blogRouter');
var testRouter = require('./routes/testRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use(blogSession);
// app.use(logger('dev'));
app.use(express.json({inflate: true, limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', antiXss, rateLimiterMiddleware);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', loginRouter);
app.use('/blogs', blogRouter);
app.use('/test', testRouter);
app.use(registerRouter);

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
