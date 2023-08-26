const express = require("express")
var loginService = require('../service/loginService');

var loginRouter = express.Router();
loginRouter.post('/login', (req, res, next) => {
  loginService.loginAccount(req, res, next);
});

module.exports = loginRouter;