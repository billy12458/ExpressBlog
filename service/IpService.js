const IP2Region = require('ip2region').default;
const Response = require('../utils/ResponseUtil');

class ipService {

    constructor() {

    }

    /**
     * Retrieve the given ip, returns a detailed account
     * @param {*} req the user's request
     * @param {*} res the user'r response
     * @param {*} next nextFunction
     */
    static getIpInfo(req, res, next) {
        Response.sendOkResponseMsg(res, 'Ip信息查询成功！', JSON.stringify(new IP2Region().searchRaw(req.query.ip)));
    }
}

module.exports = ipService;