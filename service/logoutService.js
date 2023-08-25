const Response = require('../utils/ResponseUtil')

class logoutService {

    constructor() {
        
    }

    static logoutProcess(req, res) {
        req.session.destroy(() => {
            Response.sendOkResponseMsg(res, '登出成功！', null)
        })
    }
}

module.exports = logoutService;