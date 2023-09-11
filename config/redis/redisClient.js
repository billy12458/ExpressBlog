const redis = require('ioredis').default;

var redisClient = new redis();
var emailRedisClient = new redis({keyPrefix: 'express:email:'});
var phoneRedisClient = new redis({keyPrefix: 'express:phone:'})
var emailRateLimitClient = new redis({keyPrefix: 'express:rate:email:'});
var phoneRateLimitClient = new redis({keyPrefix: 'express:rate:phone:'});
var signRedisClient = new redis({keyPrefix: 'expressSign:'});
var likeRedisClient = new redis({keyPrefix: 'express:likes:'});

module.exports = {
    redisClient,
    emailRateLimitClient,
    phoneRedisClient,
    phoneRateLimitClient,
    emailRedisClient,
    signRedisClient,
    likeRedisClient
};