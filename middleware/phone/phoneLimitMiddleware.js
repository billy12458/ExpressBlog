const createError = require('http-errors');
const { phoneRateLimitClient } = require('../../config/redis/redisClient');

let phoneLimitMiddleware = function (req, res, next) {
    phoneRateLimitClient.get(req.ip).then((result) => {
        if (result) {
            throw new Error("请求过于频繁，请稍后再试！");
        }
        else {
            phoneRateLimitClient.setex(req.ip, process.env.REDIS_MAIL_LOCK, process.env.REDIS_MAIL_LOCK_CONTENT).then(() => {
                next();
            }).catch((err) => {
                next(createError(500, "加锁设置失败！"));
            });
        }
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = phoneLimitMiddleware;
