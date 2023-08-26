const logModel = require('../model/LogModel');
const Response = require('../utils/ResponseUtil');
const errorUtil = require('../utils/errorUtil');
const { Op } = require('sequelize')

class LogService {
  // 添加日志
  static async addLog(req, res, next) {
    try {
      await logModel.create({ ...req.body, userId: "bill12458ID", loginIp: req.ip });
      Response.sendOkResponseMsg(res, '登录成功！', null);
    } catch (error) {
      errorUtil.sendDefaultError(res, error, next)
    }
  }
  // 查看所有日志
  static async getAllLogs(req, res, next) {
    try {
      // var logs = await logModel.findAll({ where: { userId: req.session.userId } });
      var logs = await logModel.findAll({
        where: { userId: 'bill12458ID' },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      Response.sendOkResponse(res, logs);
    } catch (error) {
      errorUtil.sendCustomError(res, 404, '日志查询失败！', error, next);
    }
  }

  // 分页查看日志
  static async getPagedLogsById(req, res, next) {
    try {
      let { pageSize, pageNum } = req.query;
      var logs = await logModel.findAndCountAll({
        where: {
          userId: {
            // [Op.eq]: req.session.userId
            [Op.eq]: "bill12458ID"
          }
        },
        offset: (pageNum - 1) * pageSize,
        limit: Number(pageSize),
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      Response.sendOkResponse(res, logs);
    } catch (error) {
      errorUtil.sendCustomError(res, 404, '日志查询失败！', error, next);
    }
  }
}

module.exports = LogService;