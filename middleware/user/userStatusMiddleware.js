const { statusClient } = require('../../config/redis/redisClient');
const createError = require('http-errors');
const moment = require('moment');
const Response = require('../../utils/ResponseUtil');

let userStatusMiddleware = function (req, res, next) {
    req.originalUrl === '/auth/login' ? updateStatus(req, res, next, 'lastLoginTime') : updateStatus(req, res, next, 'lastLogoutTime');
}

function updateStatus(req, res, next, field) {
    statusClient.hmset(getUserId(req),
        new Map().set(field, moment().format()).set('online', getIsOnline(req))).then(() => {
            Response.sendOkResponseMsg(res, getResponseMessage(req), null);
        }).catch((err) => {
            console.log(err.message)
            next(createError(500, '操作失败！'));
        });
}

function getUserId(req) {
    return (req.session === undefined ? req.userId : req.session.userId);
}

function getIsOnline(req) {
    return (req.originalUrl === '/auth/login' ? true : false);
}

function getResponseMessage(req) {
    return req.originalUrl === '/auth/login' ? '登录成功！' : '登出成功！'
}

module.exports = userStatusMiddleware;