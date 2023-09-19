var express = require('express');
const safetyService = require('../service/safetyService');
const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');
const secretUpdateMiddleware = require('../middleware/security/secretUpdateMiddleware');

var safetyRouter = express.Router();

safetyRouter.all('*', isLoginMiddleware);

safetyRouter.put('/secret/update', [secretUpdateMiddleware], function(req, res, next) {
    safetyService.updateUserSecret(req, res, next)
})

safetyRouter.put('/secret/view', function(req, res, next) {
    safetyService.getProcessedUserSecret(req, res, next)
})

module.exports = safetyRouter;


