const Response = require('../utils/ResponseUtil');
const { statusClient } = require('../config/redis/redisClient');
const createError = require('http-errors');

class statusService {

    constructor() {

    }

    static getStatusById(req, res, next) {
        statusClient.hgetall(this.getUserId(req)).then((result) => {
            Response.sendOkResponseMsg(res, '查询成功！', result);
        }).catch(() => {
            next(createError(500, '查询失败！'));
        });
    }

    static getUserId(req) {
        return (req.session.userId ? req.session.userId : req.query.userId);
    }
}

module.exports = statusService;