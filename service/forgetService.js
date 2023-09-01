const userService = require('../service/userService');

class forgetService {

    constructor() {

    }

    static updateForgetPassword(req, res, next) {
        userService.modifyUserInfo(req, res, next);
    }

}

module.exports = forgetService;