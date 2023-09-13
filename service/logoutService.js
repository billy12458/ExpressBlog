const Response = require('../utils/ResponseUtil')

class logoutService {

    constructor() {
        
    }

    // 已完成：登出后更新状态
    static logoutProcess(req, res, next) {
        req.userId = req.session.userId;
        req.session.destroy(() => {
            next();
        })
    }
}

module.exports = logoutService;