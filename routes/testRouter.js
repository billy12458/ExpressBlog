const express = require("express");
const { testRateLimiterMiddleware, mailRateLimiterMiddleware } = require('../middleware/limit/RedisRateLimiter');
const encrypt = require('../utils/encryptUtil');
const mailService = require("../service/mailService");
const ipService = require("../service/IpService");
// const cacheObj = require('../model/test');
const expressLimiter = require("../config/redis/expressLimiter");

var testRouter = express.Router();

testRouter.get('/rateLimit', [testRateLimiterMiddleware], function (req, res) {
  res.send('nodej test rate limit');
})

testRouter.get('/array/:length', [expressLimiter], function (req, res) {
  console.log(req.route.path);
  res.send(process.env.AUTHORIZED_URLS.split(','));
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
//   res.send(client.get('key2'))
// })

// testRouter.get('/mysql', function (req, res, next) {
//   cacheObj.find({
//     where: {
//       age: {
//         [Op.gt]: 20
//       }
//     }
//   }).then(function (row) {
//     console.log(row); // sequelize db object
//     console.log(cacheObj.cacheHit); // true or false
//   });
//   res.send(row);
// })

module.exports = testRouter;