const UserModel = require('../model/UserModel');
const random = require('string-random');
const ResponseUtil = require('../utils/ResponseUtil')
const encrypt = require('../utils/encryptUtil');
const validator = require('validator').default;
var include = ['userId', 'password', 'userName'];

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

    static async getLoginUser(req, res, next) {
        let { userId } = req.body;
        if (validator.isEmail(userId))
            return this.getUserByEmail(req);
        if (validator.isMobilePhone(userId))
            return this.getUserByPhone(req);
        else {
            return this.getUserById(req);
        }
    }

    static async getUserById(req) {
        var user = await UserModel.findOne({
            where: {
                userId: req.body.userId
            }, attributes: include
        });
        return user;
    }

    static async getUserByEmail(req) {
        var user = await UserModel.findOne({
            where: {
                email: req.body.userId
            }, attributes: include
        });
        return user;
    }

    static async getUserByPhone(req) {
        var user = await UserModel.findOne({
            where: {
                phone: req.body.userId
            }, attributes: include
        });
        return user;
    }
}

module.exports = UserDao;