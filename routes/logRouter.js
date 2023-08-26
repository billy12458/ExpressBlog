const express = require("express")
var logService = require('../service/logService');

var logRouter = express.Router();

logRouter.post('/all/:userId', function (req, res, next) {
  logService.getAllLogs(req, res, next);
})

logRouter.post('/all/paged/:userId', function (req, res, next) {
  logService.getPagedLogsById(req, res, next);
})

module.exports = logRouter;