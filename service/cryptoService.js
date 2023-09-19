const crypto = require('crypto-js');
const { Hex, Utf16, Utf8, Base64, Latin1 } = require('crypto-js').enc;
const { OpenSSL, Hex: HexFormat } = require('crypto-js').format;
const Response = require('../utils/ResponseUtil');
const encrypt = require('../utils/encryptUtil');

class cryptoService {

    constructor() {

    }

    /**
     * Static method to generate a `MD5` (simple, 32 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted
     * @param {*} res the user's response
     */
    static generateSimpleMD5(req, res) {
        Response.sendOkResponseMsg(res, 'MD5简单加密成功！', encrypt.generateSimpleMD5(req));
    }

    /**
     * Static method to generate a `MD5` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacMD5(req, res) {
        Response.sendOkResponseMsg(res, 'MD5加盐加密成功！', encrypt.generateHmacMD5(req));
    }

    /**
     * Static method to generate a `SHA1` (simple, 40 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleSHA1(req, res) {
        Response.sendOkResponseMsg(res, 'SHA1简单加密成功！', encrypt.generateSimpleSHA1(req));
    }

    /**
     * Static method to generate a `RIPEMD160` (simple, based on MD4 algorithm, 40 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleRIPEMD160(req, res) {
        Response.sendOkResponseMsg(res, 'RIPEMD160简单加密成功！', encrypt.generateSimpleRIPEMD160(req));
    }

    /**
     * Static method to generate a `RIPEMD160` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacRIPEMD160(req, res) {
        Response.sendOkResponseMsg(res, 'RIPEMD160加盐加密成功！', encrypt.generateHMacRIPEMD160(req));
    }


    /**
     * Static method to generate a `SHA1` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA1(req, res) {
        Response.sendOkResponseMsg(res, 'SHA1加盐加密成功！', encrypt.generateHmacSHA1(req));
    }

    /**
     * Static method to generate a `SHA224` (simple, 56 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleSHA224(req, res) {
        Response.sendOkResponseMsg(res, 'SHA224简单加密成功！', encrypt.generateSimpleSHA224(req));
    }

    /**
     * Static method to generate a `SHA224` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA224(req, res) {
        Response.sendOkResponseMsg(res, 'SHA224加盐加密成功！', encrypt.generateHmacSHA224(req));
    }

    /**
     * Static method to generate a `SHA256` (simple, 64 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleSHA256(req, res) {
        Response.sendOkResponseMsg(res, 'SHA256简单加密成功！', encrypt.generateSimpleSHA256(req));
    }

    /**
     * Static method to generate a `SHA256` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA256(req, res) {
        Response.sendOkResponseMsg(res, 'SHA256加盐加密成功！', encrypt.generateHmacSHA256(req));
    }

    /**
     * Static method to generate a `SHA384` (simple, 96 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleSHA384(req, res) {
        Response.sendOkResponseMsg(res, 'SHA384简单加密成功！', encrypt.generateSimpleSHA384(req));
    }

    /**
     * Static method to generate a `SHA384` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA384(req, res) {
        Response.sendOkResponseMsg(res, 'SHA384加盐加密成功！', encrypt.generateHmacSHA384(req));
    }

    /**
     * Static method to generate a `SHA512` (simple, 96 Bytes) hash
     * @param {*} req the user's request, including the string to be encrypted and the type of conversion algorithm. Default is `Hex`
     * @param {*} res the user's response
     */
    static generateSimpleSHA512(req, res) {
        Response.sendOkResponseMsg(res, 'SHA512简单加密成功！', encrypt.generateSimpleSHA512(req));
    }

    /**
     * Static method to generate a `SHA512` (Hmac) hash
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static generateHMacSHA512(req, res) {
        Response.sendOkResponseMsg(res, 'SHA512加盐加密成功！', encrypt.generateHmacSHA512(req));
    }

    /**
     * Static method to generate a special hash. Here we use [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) to help generate a hashed text with salt attached to it
     * @param {*} req the user's request, including the string to be encrypted and the iteration count
     * @param {*} res the user's response
     * @returns null
     */
    static async generateBcryptText(req, res) {
        let {text, iteration} = req.body;
        var result = await encrypt.generatePassword(text, iteration);
        Response.sendOkResponseMsg(res, 'Bcrypt加密成功！', result);
    }

    /**
     * Static method to generate a `DES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static encryptDES(req, res) {
        Response.sendOkResponseMsg(res, 'DES加密成功！', encrypt.generateDES(req));
    }

    /**
     * Static method to generate a `AES-based` cipher text
     * @param {*} req the user's request, including the string to be encrypted and the key
     * @param {*} res the user's response
     */
    static encryptAES(req, res) {
        Response.sendOkResponseMsg(res, 'AES加密成功！', encrypt.encryptAES(req));
    }

    /**
     * Static method to decrypt a `DES-based` cipher text
     * @param {*} req the user's request, including the string to be decrypted
     * @param {*} res the user's response
     */
    static decryptDES(req, res) {
        Response.sendOkResponseMsg(res, 'DES解密成功！', encrypt.decryptDES(req));
    }

    /**
     * Static method to decrypt a `AES-based` cipher text
     * @param {*} req the user's request, including the string to be decrypted
     * @param {*} res the user's response
     */
    static decryptAES(req, res) {
        Response.sendOkResponseMsg(res, 'AES解密成功！', encrypt.decryptAES(req));
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

}

module.exports = {
    cryptoService
}