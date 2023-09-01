var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const corsOptions = require('./config/corsConfig');
const antiXss = require('./middleware/antiXSSMiddleware');
const { rateLimiterMiddleware } = require('./middleware/RedisRateLimiter');
const blogSession = require('./middleware/expressSession');
const { isLoginMiddleware } = require('./middleware/isLoginMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var loginRouter = require('./routes/loginRouter');
var logoutRouter = require('./routes/logoutRouter');
var registerRouter = require('./routes/registerRouter');
var blogRouter = require('./routes/blogRouter');
var testRouter = require('./routes/testRouter');
var logRouter = require('./routes/logRouter');
const likeRouter = require('./routes/likeRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use(blogSession);
app.use(express.json({ inflate: true, limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.resolve(__dirname, '/dist')))

app.use('*', antiXss, isLoginMiddleware, rateLimiterMiddleware);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', loginRouter);
app.use('/blogs', blogRouter);
app.use('/test', testRouter);
app.use('/logout', logoutRouter);
app.use('/logs', logRouter);
app.use('/likes', likeRouter);
app.use(registerRouter);

app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status ? err.status : 500).json({
      status: err.status ? err.status : 500,
      data: '出现异常！',
      msg: err.message
    });
  }
});

module.exports = app;
