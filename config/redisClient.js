const redis = require('ioredis').default;

var redisClient = new redis();

module.exports = {
    redisClient
};