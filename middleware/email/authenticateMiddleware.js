const createError = require('http-errors');
const Response = require('../../utils/ResponseUtil');
const { emailRedisClient, emailRateLimitClient } = require('../../config/redis/redisClient');

/**
 * The middleware for authenticating email codes after `codeMiddleware` has done its job
 * @param {*} req the user's request
 * @param {*} res the user's response
 * @param {*} next nextFunction
 */
let authenticateMiddleware = async function (req, res, next) {
    var result = await emailRedisClient.get(req.body.email);
    if (req.body.code === result) {
        emailRedisClient.del(req.body.email).then(() => {
            emailRateLimitClient.del(req.ip).then(() => {
                next();
            })
        })
    } else {
        next(createError(545, "验证码有误/过期，请重试！"));
    }
}

module.exports = authenticateMiddleware;