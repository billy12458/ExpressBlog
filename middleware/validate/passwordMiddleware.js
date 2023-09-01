const createError = require('http-errors');
const { passwordSchema } = require('../../config/validate/JoiConfig');

let passwordMiddleware = function (req, res, next) {
    let {password, newPassword} = req.body;
    if(password !== newPassword) {
        next(createError(500, err.message));
    }
    passwordSchema.validateAsync(req.body).then(() => {
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = passwordMiddleware;