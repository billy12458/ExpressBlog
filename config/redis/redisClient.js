const redis = require('ioredis').default;

var redisClient = new redis();
var blogViewClient = new redis({keepAlive: 1, keyPrefix: 'express:blogs:view:'});
var statusClient = new redis({keyPrefix: 'express:user:status:'});
var emailRedisClient = new redis({keyPrefix: 'express:email:'});
var phoneRedisClient = new redis({keyPrefix: 'express:phone:'});
var emailRateLimitClient = new redis({keyPrefix: 'express:rate:email:'});
var phoneRateLimitClient = new redis({keyPrefix: 'express:rate:phone:'});
var signRedisClient = new redis({keyPrefix: 'expressSign:'});
var likeRedisClient = new redis({keyPrefix: 'express:likes:'});

module.exports = {
    redisClient,
    blogViewClient,
    statusClient,
    emailRateLimitClient,
    phoneRedisClient,
    phoneRateLimitClient,
    emailRedisClient,
    signRedisClient,
    likeRedisClient
};