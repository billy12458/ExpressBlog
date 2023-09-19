var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const corsOptions = require('./config/corsConfig');
const antiXss = require('./middleware/security/antiXSSMiddleware');
const { rateLimiterMiddleware } = require('./middleware/limit/RedisRateLimiter');
const blogSession = require('./middleware/session/expressSession');

var usersRouter = require('./routes/userRouter');
var loginRouter = require('./routes/loginRouter');
var logoutRouter = require('./routes/logoutRouter');
var registerRouter = require('./routes/registerRouter');
var blogRouter = require('./routes/blogRouter');
var testRouter = require('./routes/testRouter');
var logRouter = require('./routes/logRouter');
var likeRouter = require('./routes/likeRouter');
var forgetRouter = require('./routes/forgetRouter');
var suggestionRouter = require('./routes/suggestionRouter');
var cryptoRouter = require('./routes/cryptoRouter');
var safetyRouter = require('./routes/safetyRouter');
var statusRouter = require('./routes/statusRouter');

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
// app.use('/', express.static(path.join(__dirname, '/public/dist')))

app.use('*', antiXss, rateLimiterMiddleware);
app.use('/user', usersRouter);
app.use('/auth', loginRouter);
app.use('/blogs', blogRouter);
app.use('/test', testRouter);
app.use('/crypto', cryptoRouter);
app.use('/logout', logoutRouter);
app.use('/logs', logRouter);
app.use('/likes', likeRouter);
app.use('/forget', forgetRouter);
app.use('/suggest', suggestionRouter);
app.use('/safety', safetyRouter);
app.use('/status', statusRouter)
app.use(registerRouter);

app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status ? err.status : 500).json({
      status: err.status ? err.status : 500,
      data: '出现异常！',
      // msg: err instanceof Array ? Array(err.details).map(detail => detail.message) : err.message
      msg: err.message
    });
  }
});

module.exports = app;
