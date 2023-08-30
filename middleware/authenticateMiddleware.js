const createError = require('http-errors');
const Response = require('../utils/ResponseUtil');
const { redisClient } = require('../config/redis/redisClient');

let authenticateMiddleware = async function (req, res, next) {
    var result = await redisClient.get(req.body.email);
    if (req.body.code === result) {
        redisClient.del(req.body.email).then(() => {
            next();
        })
    } else {
        next(createError(545, "验证码有误，请重试！"));
    }
}

module.exports = authenticateMiddleware;