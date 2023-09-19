const userDao = require('../dao/userDao');
const encrypt = require('../utils/encryptUtil');
const moment = require('moment');
const logService = require('./logService');
const createError = require('http-errors');
const assert = require('node:assert');
class LoginService {

    constructor() {

    }

    /**
     * Static method for a user to login(after password authentication)
     * @param {*} req the user's request, including the secret to be encrypted
     * @param {*} res the user's response
     * @param {*} next nextFunction used to pass the request onto other middlewares
     */
    static async loginAccount(req, res, next) {
        try {
            let user = await userDao.getLoginUser(req, res, next);
            assert.notStrictEqual(user, null, new Error('没有这个账号！'))
            assert.strictEqual(await encrypt.comparePassword(req.body.password, user.password), true, new Error('您的账号/密码有误！'));
            req.session.userId = user.userId;
            req.session.userName = user.userName;
            req.session.loginTime = moment().toDate();
            logService.addLog(req, res, next);
        } catch (error) {
            next(createError(500, error.message));
        }
    }

}

module.exports = LoginService;