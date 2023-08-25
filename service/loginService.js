const { response } = require('express');
const userDao = require('../dao/userDao');
const Response = require('../utils/ResponseUtil');
const encrypt = require('../utils/encryptUtil');

class LoginService {

    constructor() {
        
    }

    static loginAccount(req, res) {
        let user = userDao.getUserById(req, res);
        // 密码比对逻辑
        if(user.password === encrypt.getSHA512Hash(req.body.password, Buffer.from(user.salt), 1024, 20).toString('utf-8'))
        //     return true;
        // return false
        // req.session.userId = user.userId;
        // req.session.userName = user.userName;
            Response.sendOkResponseMsg(res, '登录成功！', null);
    }
}

module.exports = LoginService;