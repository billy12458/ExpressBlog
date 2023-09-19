const createError = require('http-errors');
const userService = require('../../service/userService');
const { emailRedisClient, emailRateLimitClient } = require('../../config/redis/redisClient');

/**
 * The middleware for authenticating email codes after `codeMiddleware` has done its job
 * @param {*} req the user's request
 * @param {*} res the user's response
 * @param {*} next nextFunction
 */
let secretUpdateMiddleware = async function (req, res, next) {
    let email = await userService.getEmailById(req, res, next);
    var result = await emailRedisClient.get(email);
    if (req.body.code === result) {
        emailRedisClient.del(email).then(() => {
            emailRateLimitClient.del(req.ip).then(() => {
                next();
            })
        })
    } else {
        next(createError(545, "验证码有误/过期，请重试！"));
    }
}

module.exports = secretUpdateMiddleware;