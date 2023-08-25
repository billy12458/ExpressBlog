const express = require("express")
var loginService = require('../service/loginService');

var loginRouter = express.Router();
loginRouter.post('/login', (req, res) => {
  loginService.loginAccount(req, res);
})

module.exports = loginRouter;