var crypto = require('crypto');
const bcrypt = require('bcrypt');

class encryptUtil {

    constructor() {

    }

    static getSHA512Hash(text, salt, iteration, keylen) {
        return crypto.pbkdf2Sync(text, salt, iteration, keylen, 'sha512');
    }

    static async generatePassword(text, iteration) {
        var result = await bcrypt.hash(text, Number(iteration));
        return result;
    }

    static async comparePassword(password, hash) {
        var result = await bcrypt.compare(password, hash);
        return result;
    }

}

module.exports = encryptUtil;