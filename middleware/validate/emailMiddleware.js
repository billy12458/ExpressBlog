const createError = require('http-errors');
const { emailSchema } = require('../../config/validate/JoiConfig');

let emailMiddleware = function (req, res, next) {
    emailSchema.validateAsync(req.body).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = emailMiddleware;