const createError = require('http-errors');
const { phoneRedisClient, phoneRateLimitClient } = require('../../config/redis/redisClient');

/**
 * The middleware for authenticating phone codes after other middlewares has done its job
 * @param {*} req the user's request
 * @param {*} res the user's response
 * @param {*} next nextFunction
 */
let authenticateMiddleware = async function (req, res, next) {
    var result = await phoneRedisClient.get(req.body.phone);
    if (req.body.code === result) {
        phoneRedisClient.del(req.body.phone).then(() => {
            phoneRateLimitClient.del(req.ip).then(() => {
                next();
            })
        })
    } else {
        next(createError(545, "验证码有误/过期，请重试！"));
    }
}

module.exports = { authenticateMiddleware };