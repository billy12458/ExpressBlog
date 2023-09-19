const userModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const assert = require('node:assert');
const encrypt = require('../utils/encryptUtil');
const createError = require('http-errors');

class safetyService {

    constructor() {

    }

    /**
     * Static method to update a user's secret(after phone code validation).
     * @param {*} req the user's request, including the secret to be encrypted
     * @param {*} res the user's response
     */
    static updateUserSecret(req, res, next) {
        userModel.update({ secret: encrypt.encryptAES1(req.body.secret, process.env.AES_SECRET, process.env.SECRET_TYPE) }, {
            where:
            {
                userId: req.session.userId
            }
        }).then(result => {
            assert.strictEqual(result[0], 1, new Error('密保更新失败！'));
            Response.sendOkResponseMsg(res, "密保更新成功！", result);
        }).catch((err) => {
            next(createError(500, err.message));
        });
    }

    /**
     * Static method to return a user's secret(after decryption)
     * @param {*} req the user's request, including the secret to be encrypted
     * @param {*} res the user's response
     */
    static getProcessedUserSecret(req, res, next) {
        userModel.findOne({
            where: { userId: req.session.userId },
            attributes: {
                include: ['secret', 'userId']
            }
        }).then(result => {
            Response.sendOkResponseMsg(res, "密保解密成功！", encrypt.decryptAES1(result.dataValues.secret, process.env.AES_SECRET, process.env.AES_DECRYPT_TYPE));
        }).catch((err) => {
            next(createError(500, err.message));
        });
    }

}
module.exports = safetyService;