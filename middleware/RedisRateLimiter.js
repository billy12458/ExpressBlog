const { RateLimiterRedis } = require('rate-limiter-flexible');
const {redisClient} = require('../config/redisClient');
// const redis = require('redis');
//
// var client = redis.createClient({
//     legacyMode: true,
//     url: "redis://127.0.0.1:6379",
//     database: 5,
//     // isolationPoolOptions: {
//     //     min: 25,
//     //     max: 200
//     // }
// });
// client.auth('redisadmin123', function (err, reply) {
// 	if (err) throw err;
// 	console.log(reply);
// });

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "common_rate_limit",
    points: 20,
    duration: 1,
    blockDuration: 60
})

const testRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "test_rate_limit",
    points: 1,
    duration: 1,
    blockDuration: 180
})

var rateLimiterMiddleware = (req, res, next) => {
	rateLimiter.consume(req.ip)
		.then(() => {
			next();
		}).catch(() => {
			res.status(429).send({
				status: 429,
				msg: '请求过于频繁，请1分钟后再试!',
				data: null
			});
		});
};

var testRateLimiterMiddleware = (req, res, next) => {
	testRateLimiter.consume(req.ip)
		.then(() => {
			next();
		}).catch(() => {
			res.status(429).send({
				status: 429,
				msg: '请求过于频繁，请3分钟后再试!',
				data: null
			});
		});
};

module.exports = {
    testRateLimiterMiddleware,
    rateLimiterMiddleware
};

