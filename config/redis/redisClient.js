const redis = require('ioredis').default;

var redisClient = new redis();
var signRedisClient = new redis({keyPrefix: 'expressSign:'});
var likeRedisClient = new redis({keyPrefix: 'express:likes:'});

module.exports = {
    redisClient,
    signRedisClient,
    likeRedisClient
};