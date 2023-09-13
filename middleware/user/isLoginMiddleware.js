const createError = require('http-errors');

/**
 * The middleware to check whether the current session is logined.
 * @param {*} req the user's request
 * @param {*} res the user's response
 * @param {*} next nextFunction
 */
// 后期添加上urlList进行精确拦截
let isLoginMiddleware = function (req, res, next) {
    if (req.session.userId == null && process.env.AUTHORIZED_URLS.trim().split(',').filter(item => {
        return new RegExp(item).test(req.originalUrl) == true;
    }).length > 0) {
        next(createError(408, "您尚未登录/登录过期，请先登录！"));
    } else {
        next();
    }
}

module.exports = {
    isLoginMiddleware
}