const UserModel = require('../model/UserModel');
const random = require('string-random');
const ResponseUtil = require('../utils/ResponseUtil')
const encrypt = require('../utils/encryptUtil');

class UserDao {
    constructor() {

    }

    static registerUser(req, res) {
        let user = req.body;
        user.salt = random(16, {
            numbers: true,
            letters: true,
            specials: false
        });
        user.password = encrypt.getSHA512Hash(user.password, Buffer.from(user.salt), 1024, 20).toString('utf-8');
        UserModel.create(user).then(() => {
            ResponseUtil.sendOkResponseMsg(res, '注册成功！', null);
        }).catch((ex) => {
            ResponseUtil.sendErrorResponseWithCode(res, 500, null, ex.message);
        })
    }

    static async getUserById(req, res) {
        var user = await UserModel.findOne({
            where: {
                userId: req.body.userId
            }, attributes: ['userId', 'password', 'salt', 'userName']
        });
        return user;
    }

    static async getUserByEmail(req, res) {
        var user = await UserModel.findOne({
            where: {
                email: req.body.userId
            }, attributes: ['userId', 'password', 'salt', 'userName']
        });
        return user;
    }
}

module.exports = UserDao;