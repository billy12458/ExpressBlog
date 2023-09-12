const { blogViewClient } = require('../../config/redis/redisClient');

var blogViewMiddleware = function (req, res, next) {
    let { ip } = req
    blogViewClient.pfadd(req.params.blogId, ip, (data) => {
        next();
    });
}

module.exports = blogViewMiddleware;