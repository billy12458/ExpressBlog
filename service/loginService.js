const userDao = require('../dao/userDao');
const encrypt = require('../utils/encryptUtil');
const moment = require('moment');
const logService = require('./logService');
const createError = require('http-errors');
class LoginService {

    constructor() {

    }

    // 已测试：登录后更新状态
    static async loginAccount(req, res, next) {
        let user = await userDao.getLoginUser(req, res, next);
        if (await encrypt.comparePassword(req.body.password, user.password) == true) {
            req.session.userId = user.userId;
            req.session.userName = user.userName;
            req.session.loginTime = moment().toDate();
            logService.addLog(req, res, next);
        } else {
            next(createError(500, '您的账号/密码有误！'));
        }
    }

}

module.exports = LoginService;