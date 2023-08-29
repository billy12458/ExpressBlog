var express = require('express');
const userService = require('../service/userService');
const userupdateMiddleware = require('../middleware/user/userUpdateMiddleware');
var userRouter = express.Router();

userRouter.post('/sessions', function (req, res, next) {
  userService.getUserSessions(req, res, next);
})

userRouter.delete('/sessions/delete/:sessionId', function (req, res, next) {
  userService.deleteSession(req, res, next);
})

userRouter.post('/my', function (req, res, next) {
  userService.getMyUserInfoById(req, res, next);
})

userRouter.patch('/info/modify', [userupdateMiddleware], function (req, res, next) {
  userService.modifyUserInfo(req, res, next);
})

userRouter.get('/isLogin', function (req, res, next) {
  userService.isLogin(req, res, next);
})

userRouter.post('/info/:userId', function (req, res) {
  userService.getOthersUserInfoById(req, res);
})

userRouter.put('/search', function (req, res) {
  userService.getPagedUsersBySearch(req ,res);
})

module.exports = userRouter;
