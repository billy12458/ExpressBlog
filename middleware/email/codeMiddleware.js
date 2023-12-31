const createError = require('http-errors');
const Response = require('../../utils/ResponseUtil');
const { emailRedisClient } = require('../../config/redis/redisClient');

let codeMiddleware = function (req, res, next) {
    emailRedisClient.setex(req.email != null ? req.email : req.body.email, Number(process.env.REDIS_MAIL_EXPIRE), req.code).then(() => {
        Response.sendOkResponseMsg(res, '验证码发送成功，有效期15分钟！', null);
    }).catch((err) => {
        next(createError(500, "验证码设置失败！"));
    });
}

module.exports = codeMiddleware;