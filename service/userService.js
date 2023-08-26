const { sessionModel } = require('../config/mongooseConfig');
const { Op } = require('sequelize')
const userModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const { userExcludeOptions, userSearchExclude } = require('../config/sequelize/excludeOptions');
const createError = require('http-errors');

class userService {

    constructor() {

    }

    static getUserSessions(req, res, next) {
        sessionModel.find({ session: new RegExp(`${req.session.userId}`) })
            .exec().then(result => {
                Response.sendOkResponseMsg(res, "查询成功！", result);
            }).catch(() => {
                next(createError(500, "查询失败！"));
            });
    }

    // switch to global exception middleware
    static deleteSession(req, res, next) {
        sessionModel.findByIdAndRemove(req.params.sessionId).then(() => {
            Response.sendOkResponseMsg(res, "删除成功！", result);
        }).catch((err) => {
            next(createError(500, "删除失败！"));
        });
    }

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

    static async getPagedUsersBySearch(req, res) {
        let { pageSize, pageNum } = req.query;
        var userResult = await userModel.findAndCountAll(
            {
                where: {
                    userName: {
                        [Op.like]: `%${req.body.userName}%`
                    }
                },
                attributes: userSearchExclude,
                offset: (pageNum - 1) * pageSize,
                limit: Number(pageSize)
            });
        Response.sendOkResponseMsg(res, "分页查询成功！", userResult);
    }

    static isLogin(req, res, next) {
        Response.sendOkResponseMsg(res, "查询成功！", req.session.userId ? "已登录" : "未登录");
    }

}

module.exports = userService;