var express = require('express');
const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');
const statusService = require('../service/statusService');

var statusRouter = express.Router();

statusRouter.all('*', isLoginMiddleware);

statusRouter.patch('/my', function (req, res, next) {
    statusService.getStatusById(req, res, next);
})

statusRouter.patch('/other', function (req, res, next) {
    statusService.getStatusById(req, res, next);
})

module.exports = statusRouter;