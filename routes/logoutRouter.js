const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');
const logoutService = require('../service/logoutService');
const express = require("express");

var logoutRouter = express.Router();

logoutRouter.all('*', isLoginMiddleware)

logoutRouter.post('/logout', function (req, res) {
    logoutService.logoutProcess(req, res);
})

module.exports = logoutRouter;