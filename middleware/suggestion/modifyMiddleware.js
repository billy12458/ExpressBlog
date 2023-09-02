const createError = require('http-errors');
const moment = require('moment');
const suggestionService = require('../../service/suggestionService');

let modifyMiddleware = async function (req, res, next) {
    var result = await suggestionService.getModifyInfoById(req);
    if (moment().diff(result.commitTime, 'days') <= 7 && result.leftNum > 0) {
        next();
    } else
        next(createError(500, "超过7天/次数用尽，建议不得修改！"));
}

module.exports = modifyMiddleware;