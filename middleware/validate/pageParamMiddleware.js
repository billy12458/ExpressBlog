const createError = require('http-errors');
const { pagedSchema } = require('../../config/validate/JoiConfig');

let pageParamMiddleware = function (req, res, next) {
    // console.log(typeof req.query.pageNum);
    // console.log(typeof req.query.pageSize);
    pagedSchema.validateAsync(req.query).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = pageParamMiddleware;
