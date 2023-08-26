const express = require("express");
const { testRateLimiterMiddleware } = require('../middleware/RedisRateLimiter');
const encrypt = require('../utils/encryptUtil');

var testRouter = express.Router();
testRouter.get('/rateLimit', [testRateLimiterMiddleware], function (req, res) {
  res.send('nodej test rate limit');
})

testRouter.get('/array', function (req, res) {
  res.send(process.env.ARRAY_TEST.split(','));
})

testRouter.get('/password', function (req, res) {
  encrypt.generatePassword("123456", 10);
  res.send("测试完成！");
})

module.exports = testRouter;