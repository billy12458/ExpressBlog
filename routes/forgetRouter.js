const express = require("express");
const codeMiddleware = require("../middleware/codeMiddleware");
const emailMiddleware = require('../middleware/validate/emailMiddleware');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const passwordMiddleware = require('../middleware/validate/passwordMiddleware');
const mailService = require("../service/mailService");
const forgetService = require("../service/forgetService");
const userService = require("../service/userService");

var forgetRouter = express.Router();

forgetRouter.patch('/password/email', async function (req, res, next) {
    var email = await userService.getEmailById(req, res, next)
    // console.log(email);
    mailService.sendActivationCode(req, email, res, next);
}, [codeMiddleware]);

forgetRouter.post('/password/update', [passwordMiddleware, authenticateMiddleware], function (req, res, next) {
    forgetService.updateForgetPassword(req, res, next);
});

module.exports = forgetRouter;