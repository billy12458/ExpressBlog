const userService = require('../service/userService');
const encrypt=  require('../utils/encryptUtil');

class forgetService {

    constructor() {

    }

    static async updateForgetPassword(req, res, next) {
        req.body.password = await encrypt.generatePassword(req.body.password, process.env.PASS_ITERATION);
        userService.modifyUserInfo(req, res, next);
    }

}

module.exports = forgetService;