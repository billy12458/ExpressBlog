const express = require("express");
const { testRateLimiterMiddleware, mailRateLimiterMiddleware } = require('../middleware/RedisRateLimiter');
const encrypt = require('../utils/encryptUtil');
const mailService = require("../service/mailService");
const ipService = require("../service/ipService");
var createPool = require('ssdb').createPool;
var pool = createPool({
    host: '127.0.0.1',
    port: 8888,
    auth: null
});

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

testRouter.post('/sendMail/:email', [mailRateLimiterMiddleware], function (req, res, next) {
  mailService.sendTestMail(req, res, next);
})

testRouter.get('/ipInfo', function (req, res, next) {
  ipService.getIpInfo(req, res, next)
})

// testRouter.get('/ssdb', function (req, res, next) {
//   var conn = pool.acquire();
//   conn.set('key1', '12345', function(err, data) {
//     if (err) {
//       throw err;
//     }
//     // data => '1'
//   });
//   res.send(conn.get('key1'))
// })


module.exports = testRouter;