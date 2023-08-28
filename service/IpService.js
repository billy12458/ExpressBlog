const geoip = require('geoip-lite');
const Response = require('../utils/ResponseUtil');

class ipService {

    constructor() {

    }

    static getIpInfo(req, res, next) {
        const geo = geoip.lookup(req.query.ip);
        Response.sendOkResponseMsg(res, 'Ip信息查询成功！', JSON.stringify(geo));
    }
}

module.exports = ipService;