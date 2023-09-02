const redis = require('ioredis').default;

var redisClient = new redis();
var emailRedisClient = new redis({keyPrefix: 'express:email:'});
var signRedisClient = new redis({keyPrefix: 'expressSign:'});
var likeRedisClient = new redis({keyPrefix: 'express:likes:'});

module.exports = {
    redisClient,
    emailRedisClient,
    signRedisClient,
    likeRedisClient
};