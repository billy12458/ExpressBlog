const express = require("express")
var loginService = require('../service/loginService');
const userLoginMiddleware = require('../middleware/user/userLoginMiddleware');
const userStatusMiddleware = require("../middleware/user/userStatusMiddleware");

var loginRouter = express.Router();
loginRouter.post('/login', [userLoginMiddleware], (req, res, next) => {
  loginService.loginAccount(req, res, next);
}, [userStatusMiddleware]);

module.exports = loginRouter;