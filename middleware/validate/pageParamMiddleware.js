const createError = require('http-errors');
const { pagedSchema } = require('../../config/validate/JoiConfig');

/**
 * The middleware to check whether the paging params are absent
 * @param {*} req the user's request
 * @param {*} res the user's response
 * @param {*} next nextFunction
 */
let pageParamMiddleware = function (req, res, next) {
    pagedSchema.validateAsync(req.query).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = pageParamMiddleware;
