const { rateLimit } = require('express-rate-limit');
const RedisStore = require("rate-limit-redis").default;
const Redis = require("ioredis").default;

// Create a `ioredis` client
const client = new Redis();

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	message: "请求过于频繁，请60分钟后重试！",
	statusCode: 429,
	max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: true, // X-RateLimit-* headers
	// Use an external store for more precise rate limiting
	store: new RedisStore({
		sendCommand: (...args) => client.call(...args),
		prefix: 'rate_limit:redis:'
	})
})

module.exports = limiter;