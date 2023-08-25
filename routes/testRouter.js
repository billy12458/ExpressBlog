const express = require("express");
const {testRateLimiterMiddleware} = require('../middleware/RedisRateLimiter');

var testRouter = express.Router();
testRouter.get('/rateLimit', [testRateLimiterMiddleware],function (req, res) {
  res.send('nodej test rate limit');
})

module.exports = testRouter;