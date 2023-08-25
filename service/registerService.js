const userDao = require('../dao/userDao');
const Response = require('../utils/ResponseUtil');

class registerService {

    constructor() {
        
    }

    static registerUser(req, res) {
        userDao.registerUser(req, res);
    }

}

module.exports = registerService;