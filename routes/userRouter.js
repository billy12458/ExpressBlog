var express = require('express');
const userService = require('../service/userService');
const userUpdateMiddleware = require('../middleware/user/userUpdateMiddleware');
const mailService = require("../service/mailService");
const codeMiddleware = require("../middleware/email/codeMiddleware");
const authenticateMiddleware = require("../middleware/email/authenticateMiddleware");
const { authenticateMiddleware: phoneVerify } = require('../middleware/phone/authenticateMiddleware');
const emailMiddleware = require('../middleware/validate/emailMiddleware');
const emailLimitMiddleware = require('../middleware/email/emailLimitMiddleware');
const phoneCodeMiddleware = require('../middleware/phone/phoneCodeMiddleware');
const phoneLimitMiddleware = require('../middleware/phone/phoneLimitMiddleware');
const phoneMiddleware = require('../middleware/validate/phoneMiddleware');
const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');
const messageService = require('../service/messageService');
const statusService = require('../service/statusService');

var userRouter = express.Router();

userRouter.all('*', isLoginMiddleware);

userRouter.post('/sessions', function (req, res, next) {
  userService.getUserSessions(req, res, next);
})

userRouter.delete('/sessions/delete/:sessionId', function (req, res, next) {
  userService.deleteSession(req, res, next);
})

userRouter.post('/my', function (req, res, next) {
  userService.getMyUserInfoById(req, res, next);
})

userRouter.patch('/info/modify', [userUpdateMiddleware], function (req, res, next) {
  userService.modifyUserInfo(req, res, next);
})

userRouter.post('/email/sendCode', [emailLimitMiddleware], function (req, res, next) {
  mailService.sendActivationCode(req, null, res, next);
}, [codeMiddleware]);

userRouter.patch('/email/modify', [emailMiddleware, authenticateMiddleware], (req, res, next) => {
  userService.modifyEmailInfo(req, res, next);
});

userRouter.patch('/phone/sendCode', [phoneLimitMiddleware], function (req, res, next) {
  messageService.sendMessageAsync(req, res, next);
}, [phoneCodeMiddleware])

userRouter.post('/phone/modify', [phoneMiddleware, phoneVerify], function (req, res, next) {
  userService.modifyphoneInfo(req, res, next);
});

userRouter.patch('/status/my', function (req, res, next) {
  statusService.getStatusById(req, res, next);
})

userRouter.get('/isLogin', function (req, res, next) {
  userService.isLogin(req, res, next);
})

userRouter.post('/info/:userId', function (req, res) {
  userService.getOthersUserInfoById(req, res);
})

userRouter.put('/search', function (req, res) {
  userService.getPagedUsersBySearch(req, res);
})

module.exports = userRouter;
