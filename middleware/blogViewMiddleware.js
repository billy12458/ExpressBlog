const { redisClient } = require('../config/redisClient');

var blogViewMiddleware = function (req, res, next) {
    let { ip } = req
    redisClient.pfadd(req.params.blogId, ip, (data) => {
        console.log(data);
    })
    next();
}

module.exports = blogViewMiddleware;