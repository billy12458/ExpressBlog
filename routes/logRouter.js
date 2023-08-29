const express = require("express")
var logService = require('../service/logService');

var logRouter = express.Router();

logRouter.patch('/all', function (req, res, next) {
  logService.getAllLogs(req, res, next);
})

logRouter.patch('/all/paged', function (req, res, next) {
  logService.getPagedLogsById(req, res, next);
})

logRouter.post('/user/:userId/ip', function (req, res, next) {
  logService.getLastLoginIp(req, res, next);
})

module.exports = logRouter;