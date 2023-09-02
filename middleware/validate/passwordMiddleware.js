const createError = require('http-errors');
const { passwordSchema } = require('../../config/validate/JoiConfig');

let passwordMiddleware = function (req, res, next) {
    passwordSchema.validateAsync(req.body).then(() => {
        let { password, newPassword } = req.body;
        if (password != newPassword) {
           throw new Error("2次密码不相同，请重新输入！");
        }
        next();
    }).catch((err) => {
        next(createError(500, err.message));
    })
}

module.exports = passwordMiddleware;