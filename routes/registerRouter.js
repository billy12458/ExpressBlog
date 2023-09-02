const express = require("express")
// var registerService = require('../service/registerService');
const mailService = require("../service/mailService");
const codeMiddleware = require("../middleware/email/codeMiddleware");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");
const registerService = require('../service/registerService');

var registerRouter = express.Router();
registerRouter.post('/register/sendCode', (req, res, next) => {
  mailService.sendActivationCode(req, res, next);
}, [codeMiddleware]);

registerRouter.patch('/register/sure', [authenticateMiddleware], (req, res, next) => {
  registerService.registerUser(req, res, next);
});

module.exports = registerRouter;