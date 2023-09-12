const express = require("express")
// var registerService = require('../service/registerService');
const mailService = require("../service/mailService");
const codeMiddleware = require("../middleware/email/codeMiddleware");
const emailLimitMiddleware = require('../middleware/email/emailLimitMiddleware');
const authenticateMiddleware = require("../middleware/email/authenticateMiddleware");
const registerService = require('../service/registerService');

var registerRouter = express.Router();
registerRouter.post('/register/sendCode', [emailLimitMiddleware], (req, res, next) => {
  mailService.sendActivationCode(req, null, res, next);
}, [codeMiddleware]);

registerRouter.patch('/register/sure', [authenticateMiddleware], (req, res, next) => {
  registerService.registerUser(req, res, next);
});

module.exports = registerRouter;