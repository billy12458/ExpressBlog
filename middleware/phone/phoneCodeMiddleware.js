const createError = require('http-errors');
const Response = require('../../utils/ResponseUtil');
const { phoneRedisClient } = require('../../config/redis/redisClient');

let phoneCodeMiddleware = function(req, res, next) {
    phoneRedisClient.setex(req.phone != null ? req.phone : req.body.phone, Number(process.env.REDIS_PHONE_EXPIRE), req.code).then(() => {
        Response.sendOkResponseMsg(res, '验证码发送成功，有效期5分钟！', null);
    }).catch((err) => {
        next(createError(500, "验证码设置失败！"));
    });
}

module.exports = phoneCodeMiddleware;