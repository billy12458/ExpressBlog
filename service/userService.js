const { sessionModel } = require('../config/mongooseConfig');
const { Op } = require('sequelize')
const userModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const { userExcludeOptions, userSearchExclude, emailInclude } = require('../config/sequelize/excludeOptions');
const createError = require('http-errors');

class userService {

    constructor() {

    }

    /**
     * Retrieve the user's sessions, here we use mongodb + connect-mongo to store sessions
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction to further spread information
     */
    static getUserSessions(req, res, next) {
        sessionModel.find({ session: new RegExp(`${req.session.userId}`) })
            .exec().then(result => {
                Response.sendOkResponseMsg(res, "查询成功！", result);
            }).catch(() => {
                next(createError(500, "查询失败！"));
            });
    }

    /**
     * delete the user's specific session, causing the related device to log out the account
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction to further spread information
     */
    // switch to global exception middleware
    static deleteSession(req, res, next) {
        sessionModel.findByIdAndRemove(req.params.sessionId).then((result) => {
            Response.sendOkResponseMsg(res, "删除成功！", result);
        }).catch((err) => {
            console.log(err);
            next(createError(500, "删除失败！"));
        });
    }

    /**
     * Retrieve the current user's user info(without sensitive information)
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction to further spread information
     */
    static getMyUserInfoById(req, res, next) {
        userModel.findOne({
            where: { userId: req.session.userId },
            attributes: userExcludeOptions
        }).then((userResult) => {
            Response.sendOkResponseMsg(res, "查询成功！", userResult);
        }).catch(() => {
            next(createError(404, "没有此用户！"));
        })
    }

    static async getEmailById(req, res, next) {
        var result = await userModel.findByPk(req.session.userId, { attributes: emailInclude });
        return result.dataValues.email;
    }

    /**
    * Retrieve other user's user info(without sensitive information)
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
    static getOthersUserInfoById(req, res, next) {
        userModel.findOne({
            where: { userId: req.params.userId },
            attributes: userSearchExclude
        }).then((userResult) => {
            Response.sendOkResponseMsg(res, "查询成功！", userResult);
        }).catch(() => {
            next(createError(404, "没有此用户！"));
        })
    }

    /**
    * Modify the current user's info(except for phone)
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
    static modifyUserInfo(req, res, next) {
        userModel.update({ ...req.body }, {
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                }
            }
        }).then(() => {
            Response.sendOkResponseMsg(res, "更新成功！", null);
        }).catch((err) => {
            console.log(err.message);
            next(createError(500, "更新失败！"));
        })
    }

    // 代码一样，但是要在中间件里面进行数据校验和邮箱验证码验证！
    static modifyEmailInfo(req, res, next) {
        this.modifyUserInfo(req, res, next);
    }

    static getPagedUsersBySearch(req, res) {
        let { pageSize, pageNum } = req.query;
        userModel.findAndCountAll({
            where: {
                userName: {
                    [Op.like]: `%${req.body.userName}%`
                }
            },
            attributes: userSearchExclude,
            offset: (pageNum - 1) * pageSize,
            limit: Number(pageSize)
        }).then((userResult) => {
            Response.sendOkResponseMsg(res, "用户查询成功！", userResult);
        }).catch((err) => {
            next(createError(500, "用户查询失败！"));
        })
    }

    static isLogin(req, res, next) {
        Response.sendOkResponseMsg(res, "查询成功！", req.session.userId ? "已登录" : "未登录");
    }

}

module.exports = userService;