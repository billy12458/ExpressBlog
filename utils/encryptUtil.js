var crypto = require('crypto-js');
const { Hex, Utf16, Utf8, Base64, Latin1 } = require('crypto-js').enc;
const { OpenSSL, Hex: HexFormat } = require('crypto-js').format;
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

    /**
     * Static method to generate a `MD5` (simple, 32 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     */
    static generateSimpleMD5(req) {
        return crypto.MD5(this.getEncryptContent(req)).toString(this.getResultAlgorithm(null));
    }

    /**
     * Static method to generate a `MD5` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacMD5(req) {
        let { text, key } = req.body;
        return crypto.HmacMD5(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `RIPEMD160` (simple, based on MD4 algorithm, 40 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleRIPEMD160(req) {
        return crypto.RIPEMD160(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `RIPEMD160` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacRIPEMD160(req) {
        let { text, key } = req.body;
        return crypto.HmacRIPEMD160(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA1` (simple, 40 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleSHA1(req) {
        return crypto.SHA1(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA1` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacSHA1(req) {
        let { text, key } = req.body;
        return crypto.HmacSHA1(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA224` (simple, 56 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleSHA224(req) {
        return crypto.SHA224(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA224` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacSHA224(req) {
        let { text, key } = req.body;
        return crypto.HmacSHA224(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA256` (simple, 64 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleSHA256(req) {
        return crypto.SHA256(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA256` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacSHA256(req) {
        let { text, key } = req.body;
        return crypto.HmacSHA256(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA384` (simple, 96 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleSHA384(req) {
        return crypto.SHA384(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA384` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacSHA384(req) {
        let { text, key } = req.body;
        return crypto.HmacSHA384(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA512` (simple, 128 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     */
    static generateSimpleSHA512(req) {
        return crypto.SHA512(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `SHA512` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateHmacSHA512(req) {
        let { text, key } = req.body;
        return crypto.HmacSHA512(text, key).toString(this.getResultAlgorithm(req.query.type));
    }

    /**
     * Static method to generate a `DES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static generateDES(req) {
        let { text, key } = req.body;
        return crypto.DES.encrypt(text, key).toString(this.getFormatter(req.query.type));
    }

    /**
     * Static method to generate a `AES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     */
    static encryptAES(req) {
        let { text, key } = req.body;
        return crypto.AES.encrypt(text, key).toString(this.getFormatter(req.query.type));
    }

    /**
     * Static method to generate a `AES-based` cipher text
     * @param {*} text 
     * @param {*} key 
     * @param {*} type 
     * @returns 
     */
    static encryptAES1(text, key, type) {
        return crypto.AES.encrypt(text, key).toString(this.getFormatter(type));
    }

    static decryptDES(req) {
        let { cipherText, key } = req.body;
        return crypto.DES.decrypt(cipherText, key).toString(this.getResultAlgorithm(req.query.type));
    }

    static decryptAES(req) {
        let { cipherText, key } = req.body;
        return crypto.AES.decrypt(cipherText, key).toString(this.getResultAlgorithm(req.query.type));
    }

    static decryptAES1(text, key, type) {
        return crypto.AES.decrypt(text, key).toString(this.getResultAlgorithm(type));
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

    /**
     * Static method to determine which algorithm will the result use. Here we use ternary operator
     * @param {*} type the type from the user
     */
    static getResultAlgorithm(type) {
        var algorithm;
        type === null ? algorithm = Hex :
            (type === 'Base64' ? algorithm = Base64 :
                (type === 'Utf8' ? algorithm = Utf8 :
                    type === 'Utf16' ? algorithm = Utf16 : algorithm == Latin1))
        return algorithm;
    }

    static getEncryptContent(req) {
        return (req.params.text ? req.params.text : req.body.text);
    }

    /**
     * Static method to determine which formatter will the result use, either `Hex` or `OpenSSL`. Here we use ternary operator
     * @param {*} type the type from the user
     */
    static getFormatter(type) {
        return (type === 'Hex' ? HexFormat : OpenSSL);
    }

}

module.exports = encryptUtil;