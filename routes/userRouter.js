var express = require('express');
const userService = require('../service/userService');
var userRouter = express.Router();

userRouter.post('/sessions', function (req, res) {
  userService.getUserSessions(req, res);
})

userRouter.delete('/sessions/delete/:sessionId', function (req, res) {
  userService.deleteSession(req, res);
})

userRouter.post('/my', function (req, res) {
  userService.getUserInfoById(req, res);
})

userRouter.post('/info/:userId', function (req, res) {
  userService.getUserInfoById(req, res);
})

userRouter.put('/search', function (req, res) {
  userService.getPagedUsersBySearch(req ,res);
})

module.exports = userRouter;
