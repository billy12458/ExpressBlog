const { sessionModel } = require('../config/mongooseConfig');
const {Op} = require('sequelize')
const userModel = require('../model/UserModel');
const Response = require('../utils/ResponseUtil');
const {userExcludeOptions, userSearchExclude} = require('../config/sequelize/excludeOptions');

class userService {

    constructor() {

    }

    static async getUserSessions(req, res) {
        var result = await sessionModel.find({ session: new RegExp(`${req.session.userId}`) }).exec();
        Response.sendOkResponseMsg(res, "查询成功！", result);
    }

    static deleteSession(req, res) {
        sessionModel.findByIdAndRemove(req.params.sessionId).then(() => {
            Response.sendOkResponseMsg(res, "删除成功！", result);
        }).catch((err) => {
            Response.sendErrorResponse(res, err.message, '删除出现异常！');
        });
    }

    static async getUserInfoById(req, res) {
        var userResult = await userModel.findOne({
            where: { userId: req.params.userId ? req.params.userId : req.session.userId },
            attributes: userExcludeOptions
        });
        Response.sendOkResponseMsg(res, "查询成功！", userResult);
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

}

module.exports = userService;