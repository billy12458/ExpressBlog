const session = require('express-session');
const uuid = require('uuid');
const store = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();
var blogSession = session({
    genid: function(request) {
        return uuid.v4();
    },
    name: 'blog-my-session',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store.create({
        mongoUrl: process.env.MONGO_URL
    }),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 168,
        httpOnly: true,
        path: '/',
        sameSite: 'strict'
    }
});

module.exports = blogSession;