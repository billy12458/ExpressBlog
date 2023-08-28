const UserModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const createError = require('http-errors');

class registerService {

    constructor() {
        
    }

    static registerUser(req, res, next) {
        let user = req.body;
        UserModel.create(user).then(() => {
            Response.sendOkResponseMsg(res, '注册成功！', null);
        }).catch((ex) => {
            next(createError(512, "注册失败！"));
        })
    }

}

module.exports = registerService;