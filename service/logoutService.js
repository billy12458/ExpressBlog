const Response = require('../utils/ResponseUtil')

class logoutService {

    constructor() {
        
    }

    // 已完成：登出后更新状态
    static logoutProcess(req, res) {
        req.session.destroy(() => {
            Response.sendOkResponseMsg(res, '登出成功！', null)
        })
    }
}

module.exports = logoutService;