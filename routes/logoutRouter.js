const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');
const userStatusMiddleware = require('../middleware/user/userStatusMiddleware');
const logoutService = require('../service/logoutService');
const express = require("express");

var logoutRouter = express.Router();

logoutRouter.all('*', isLoginMiddleware)

logoutRouter.post('/logout', function (req, res, next) {
    logoutService.logoutProcess(req, res, next);
}, [userStatusMiddleware]);

module.exports = logoutRouter;