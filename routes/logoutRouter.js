const logoutService = require('../service/logoutService');
const express = require("express");

var logoutRouter = express.Router();

logoutRouter.post('/logout', function (req, res) {
    logoutService.logoutProcess(req, res);
})

module.exports = logoutRouter;