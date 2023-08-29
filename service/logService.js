const createError = require('http-errors');
const logModel = require('../model/LogModel');
const sequelize = require('../config/sequelize/sequelize');
const Response = require('../utils/ResponseUtil');
const { Op } = require('sequelize')

class LogService {
  // 添加日志
  static async addLog(req, res, next) {
    try {
      await logModel.create({ ...req.body, userId: req.session.userId, loginIp: req.ip });
      Response.sendOkResponseMsg(res, '登录成功！', null);
    } catch (error) {
      next(createError(404, "日志更新失败！"));
    }
  }
  // 查看所有日志
  static async getAllLogs(req, res, next) {
    try {
      var logs = await logModel.findAll({
        where: { userId: req.session.userId },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      Response.sendOkResponse(res, logs);
    } catch (error) {
      next(createError(404, "查询失败！"));
    }
  }

  // 分页查看日志
  static async getPagedLogsById(req, res, next) {
    try {
      let { pageSize, pageNum } = req.query;
      var logs = await logModel.findAndCountAll({
        where: {
          userId: { [Op.eq]: req.session.userId }
        },
        offset: (pageNum - 1) * Number(pageSize),
        limit: Number(pageSize),
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      Response.sendOkResponse(res, logs);
    } catch (error) {
      console.log(error)
      next(createError(404, "分页查询失败！"));
    }
  }

  // 根据时间最大值和userId寻找对应IP地址
  static getLastLoginIp(req, res, next) {
    let { userId } = req.params;
    sequelize.query(
      `SELECT loginIp FROM logs where createdAt = (
         SELECT MAX(createdAt) FROM logs WHERE userId = '${userId}'
       )`,
      {
        model: logModel,
        mapToModel: true
      }
    ).then((result) => {
      Response.sendOkResponseMsg(res, '查询成功！', result[0]);
    }).catch((err) => {
      console.log(err);
      next(createError(404, "IP查询失败！"));
    })
    // logModel.findOne({
    //   where: {
    //     [Op.and]:
    //     {
    //       userId: userId
    //     }
    //   }, attributes: ['loginIp']
    // }).then((result) => {
    //   Response.sendOkResponseMsg(res, '查询成功！', result);
    // }).catch(() => {
    //   next(createError(404, "分页查询失败！"));
    // })
  }

}

module.exports = LogService;