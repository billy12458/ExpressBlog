const {loginSchema} = require('../../config/validate/JoiConfig');
const createError = require('http-errors');

let updateMiddleware = function (req, res, next) {
    loginSchema.validateAsync(req.body, {
        artifacts: true,
        warnings: true
    }).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    });
}

module.exports = updateMiddleware;