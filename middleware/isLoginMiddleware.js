const Response = require('../utils/ResponseUtil');

// 后期添加上urlList进行精确拦截
let isLoginMiddleware = function (req, res, next) {
    // if (req.session.userId == null && !process.env.ARRAY_TEST.includes(req.baseUrl)) {
    //     res.statusCode = 408;
    //     // res.message = "您尚未登录/登录过期，请先登录！";
    //     throw new Error("您尚未登录/登录过期，请先登录！");
    // }
    next();
}

module.exports = {
    isLoginMiddleware
}