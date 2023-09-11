const createError = require('http-errors');
const { phoneSchema } = require('../../config/validate/JoiConfig');

let phoneMiddleware = function (req, res, next) {
    phoneSchema.validateAsync(req.body).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = phoneMiddleware;