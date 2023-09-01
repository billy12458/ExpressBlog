const createError = require('http-errors');
const moment = require('moment');

let modifyMiddleware = function (req, res, next) {
    if(moment().diff(req.body.commitTime, 'days') <= 7) {
        if(Number(req.body.leftNum) >= 0) {
            next();
        }
    } else 
        next(createError(500, "超过7天/次数用尽，建议不得修改！"));
}

module.exports = modifyMiddleware;