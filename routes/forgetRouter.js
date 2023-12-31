const express = require("express");
const codeMiddleware = require("../middleware/email/codeMiddleware");
const emailLimitMiddleware = require('../middleware/email/emailLimitMiddleware');
const emailMiddleware = require('../middleware/validate/emailMiddleware');
const authenticateMiddleware = require('../middleware/email/authenticateMiddleware');
const passwordMiddleware = require('../middleware/validate/passwordMiddleware');
const { isLoginMiddleware } = require("../middleware/user/isLoginMiddleware");
const mailService = require("../service/mailService");
const forgetService = require("../service/forgetService");
const userService = require("../service/userService");

var forgetRouter = express.Router();

forgetRouter.all('*', isLoginMiddleware);

forgetRouter.patch('/password/email', [emailLimitMiddleware], async function (req, res, next) {
    mailService.sendActivationCode(req, await userService.getEmailById(req, res, next), res, next);
}, [codeMiddleware]);

forgetRouter.post('/password/update', [passwordMiddleware, authenticateMiddleware], function (req, res, next) {
    forgetService.updateForgetPassword(req, res, next);
});

module.exports = forgetRouter;