const { Op } = require('sequelize');
const suggestionModel = require('../model/SuggestionModel');
const Response = require('../utils/ResponseUtil');
const createError = require('http-errors');

class suggestionService {

    constructor() {

    }

    static saveSuggestion(req, res, next) {
        let suggestion = req.body;
        suggestion.userId = req.session.userId;
        suggestionModel.create(suggestion).then(result => {
            Response.sendOkResponseMsg(res, "反馈成功！", null);
        }).catch((err) => {
            next(createError(500, "反馈失败！"));
        });
    }

    static async modifySuggestion(req, res, next) {
        suggestionModel.update({ ...req.body, leftNum: req.leftNum - 1 }, {
            where: {
                userId: req.session.userId,
                suggestionId: req.params.suggestId
            }
        }).then((result) => {
            Response.sendOkResponseMsg(res, "更新建议成功！", result);
        }).catch((err) => {
            next(createError(500, "更新建议失败！"));
        });
    }

    static getSuggestionById(req, res, next) {
        suggestionModel.findOne({
            where: {
                userId: req.session.userId,
                suggestionId: req.params.id
            }
        }).then((result) => {
            Response.sendOkResponseMsg(res, "查询成功！", result);
        }).catch((err) => {
            next(createError(500, "查询失败！"));
        });
    }

    static getPagedSuggestions(req, res, next, complete) {
        let { pageNum, pageSize } = req.query;
        suggestionModel.findAndCountAll({
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                },
                completed: complete == null ? {
                    [Op.in]: [0, 1]
                } : {
                    [Op.eq]: complete
                }
            },
            offset: (pageNum - 1) * pageSize,
            limit: Number(pageSize)
        }).then((result) => {
            Response.sendOkResponseMsg(res, "建议查询成功！", result);
        }).catch((err) => {
            next(createError(500, "建议查询失败！"));
        })
    }

    static async getModifyInfoById(req) {
        var result = await suggestionModel.findByPk(req.params.suggestId, { attributes: ['leftNum', 'commitTime'] });
        return result.dataValues;
    }

}

module.exports = suggestionService;