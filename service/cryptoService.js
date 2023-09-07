const crypto = require('crypto-js');
const { Hex, Utf16, Utf8, Base64, Latin1 } = require('crypto-js').enc;
const { OpenSSL, Hex: HexFormat } = require('crypto-js').format;
const Response = require('../utils/ResponseUtil');

class cryptoService {

    constructor() {

    }

    /**
     * Static method to generate a `MD5` (simple, 32 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     * @param {*} res the user's response
     */
    static generateSimpleMD5(req, res) {
        var MD5Hash = crypto.MD5(this.getEncryptContent(req)).toString(this.getResultAlgorithm(null));
        Response.sendOkResponseMsg(res, 'MD5简单加密成功！', MD5Hash);
    }

    /**
     * Static method to generate a `MD5` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacMD5(req, res) {
        let { text, key } = req.body;
        var HmacMD5 = crypto.HmacMD5(text, key).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'MD5加盐加密成功！', HmacMD5);
    }

    /**
     * Static method to generate a `SHA1` (simple, 40 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     * @param {*} res the user's response
     */
    static generateSimpleSHA1(req, res) {
        var SHA1Hash = crypto.SHA1(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA1简单加密成功！', SHA1Hash);
    }

    /**
     * Static method to generate a `SHA1` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA1(req, res) {
        let { text, key } = req.body;
        var HmacSHA1 = crypto.HmacSHA1(text, key).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA1加盐加密成功！', HmacSHA1);
    }

    /**
     * Static method to generate a `SHA224` (simple, 56 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     * @param {*} res the user's response
     */
    static generateSimpleSHA224(req, res) {
        var SHA224Hash = crypto.SHA224(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA224简单加密成功！', SHA224Hash);
    }

    /**
     * Static method to generate a `SHA224` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA224(req, res) {
        let { text, key } = req.body;
        var HmacSHA224 = crypto.HmacSHA224(text, key).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA224加盐加密成功！', HmacSHA224);
    }

    /**
     * Static method to generate a `SHA256` (simple, 64 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     * @param {*} res the user's response
     */
    static generateSimpleSHA256(req, res) {
        var SHA256Hash = crypto.SHA256(this.getEncryptContent(req)).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA256简单加密成功！', SHA256Hash);
    }

    /**
     * Static method to generate a `SHA256` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA256(req, res) {
        let { text, key } = req.body;
        var HmacSHA256 = crypto.HmacSHA256(text, key).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'SHA256加盐加密成功！', HmacSHA256);
    }

    /**
     * Static method to generate a `DES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static encryptDES(req, res) {
        let { text, key } = req.body;
        var DESresult = crypto.DES.encrypt(text, key).toString(this.getFormatter(req.query.type));
        Response.sendOkResponseMsg(res, 'DES加密成功！', DESresult);
    }

    /**
     * Static method to generate a `AES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static encryptAES(req, res) {
        let { text, key } = req.body;
        var AESresult = crypto.AES.encrypt(text, key).toString(this.getFormatter(req.query.type));
        Response.sendOkResponseMsg(res, 'AES加密成功！', AESresult);
    }

    static decryptDES(req, res) {
        let { cipherText, key } = req.body;
        var DESresult = crypto.DES.decrypt(cipherText, key).toString(this.getResultAlgorithm(req.query.type));
        Response.sendOkResponseMsg(res, 'DES解密成功！', DESresult);
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

    /**
     * Static method to determine which formatter will the result use, either `Hex` or `OpenSSL`. Here we use ternary operator
     * @param {*} type the type from the user
     */
    static getFormatter(type) {
        return (type === 'Hex' ? HexFormat : OpenSSL);
    }

    static getEncryptContent(req) {
        return (req.params.text ? req.params.text : req.body.text);
    }

}

module.exports = {
    cryptoService
}