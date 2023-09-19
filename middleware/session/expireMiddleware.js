const Response = require('../../utils/ResponseUtil');

let logoutMiddleware = function (req, res, next) {
    req.session.destroy(() => {
        Response.sendOkResponseMsg(res, "账号注销成功！", null);
    })
}

module.exports = logoutMiddleware;