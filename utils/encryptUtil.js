var crypto = require('crypto');
const bcrypt = require('bcryptjs');

class encryptUtil {

    constructor() {

    }

    static getSHA512Hash(text, salt, iteration, keylen) {
        return crypto.pbkdf2Sync(text, salt, iteration, keylen, 'sha512');
    }

}

module.exports = encryptUtil;