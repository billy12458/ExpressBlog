const express = require("express")
var logService = require('../service/logService');
const { isLoginMiddleware } = require("../middleware/user/isLoginMiddleware");

var logRouter = express.Router();

logRouter.all('*', isLoginMiddleware);

logRouter.patch('/all', function (req, res, next) {
  logService.getAllLogs(req, res, next);
})

logRouter.patch('/all/paged', function (req, res, next) {
  logService.getPagedLogsById(req, res, next);
})

logRouter.delete('/delete/all', function (req, res, next) {
  logService.deleteAllLogs(req, res, next);
})

logRouter.post('/user/:userId/ip', function (req, res, next) {
  logService.getLastLoginIp(req, res, next);
})

logRouter.post('/lastlogin', function (req, res, next) {
  logService.getLastLoginInfo(req, res, next);
})

module.exports = logRouter;