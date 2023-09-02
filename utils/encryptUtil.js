var crypto = require('crypto');
const bcrypt = require('bcrypt');
/**
 * The utility class for encrypting and decrypting texts, currently using bcrypt  
 * [bcrypt.js Github page](https://github.com/dcodeIO/bcrypt.js)
 */
class encryptUtil {

    /**
     * An empty constructor
     */
    constructor() {

    }

    static getSHA512Hash(text, salt, iteration, keylen) {
        return crypto.pbkdf2Sync(text, salt, iteration, keylen, 'sha512');
    }

    /**
     * Use [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) to help generate a hashed password with salt attached to it
     * @param {*} text the original plain password
     * @param {*} iteration the number of hash iteration
     * @returns 
     */
    static async generatePassword(text, iteration) {
        var result = await bcrypt.hash(text, Number(iteration));
        return result;
    }

    /**
     * Use [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) to help compare a plain password and a encrypted one
     * @param {*} password the original plain password
     * @param {*} hash the encrypted password stored in a database
     * @returns 
     */
    static async comparePassword(password, hash) {
        var result = await bcrypt.compare(password, hash);
        return result;
    }

}

module.exports = encryptUtil;