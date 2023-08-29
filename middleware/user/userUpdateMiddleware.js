const { updateSchema } = require('../../config/validate/JoiConfig');
const createError = require('http-errors');

let updateMiddleware = function (req, res, next) {
    updateSchema.validateAsync(req.body, {
        warnings: true
    }).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    });
}

module.exports = updateMiddleware;