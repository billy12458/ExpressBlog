const express = require("express")
var registerService = require('../service/registerService');
const mailService = require("../service/mailService");

var registerRouter = express.Router();
registerRouter.post('/register/sure', (req, res, next) => {
  mailService.sendActivationCode(req, res, next);
  // registerService.registerUser(req, res, next);
});

module.exports = registerRouter;