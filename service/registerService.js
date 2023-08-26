const UserModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const errorUtil = require('../utils/errorUtil');

class registerService {

    constructor() {
        
    }

    static registerUser(req, res, next) {
        let user = req.body;
        UserModel.create(user).then(() => {
            Response.sendOkResponseMsg(res, '注册成功！', null);
        }).catch((ex) => {
            errorUtil.sendCustomError(res, 500, "注册失败！", ex, next)
        })
    }

}

module.exports = registerService;