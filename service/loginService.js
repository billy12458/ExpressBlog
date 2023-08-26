const userDao = require('../dao/userDao');
const encrypt = require('../utils/encryptUtil');
const moment = require('moment');
const logService = require('./logService')

class LoginService {

    constructor() {

    }

    // 一定不要忘记bcrypt的使用方法！
    static async loginAccount(req, res, next) {
        let user = await userDao.getUserById(req, res);
        if(await encrypt.comparePassword(req.body.password, user.password) == true) {
           req.session.userId = user.userId;
            req.session.userName = user.userName;
            req.session.loginTime = moment().toDate(); 
            logService.addLog(req, res, next);
        } else {
            next(new Error('您的账号/密码有误！'));
        }
        // // 密码比对逻辑
        // if (user.password === encrypt.getSHA512Hash(req.body.password, Buffer.from(user.salt), 1024, 20).toString('utf-8'))
        //     return true;
        // return false
        // req.session.userId = user.userId;
        // req.session.userName = user.userName;
    }

}

module.exports = LoginService;