const createError = require('http-errors');
const logModel = require('../model/LogModel');
const sequelize = require('../config/sequelize/sequelize');
const Response = require('../utils/ResponseUtil');
const { Op } = require('sequelize')

class LogService {

  /**
    * Add a login log everytime a user made a successful login
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
  static async addLog(req, res, next) {
    try {
      await logModel.create({ ...req.body, userId: req.session.userId, loginIp: req.ip });
      next();
    } catch (error) {
      next(createError(404, "日志更新失败！"));
    }
  }

  /**
    * Retrieve all login logs of a user
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
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

  /**
    * Retrieve login logs of a user with pagination
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
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

  /**
    * Find out the user's last login info
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
  static getLastLoginInfo(req, res, next) {
    let { userId } = req.params;
    sequelize.query(
      `SELECT * FROM logs where createdAt = (
         SELECT MAX(createdAt) FROM logs WHERE userId = '${userId ? userId : req.session.userId}'
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
  }

  /**
    * Find out the user's last login IP
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
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
  }

  /**
    * Deletes all login logs(limit: once per day)
    * @param {*} req the user's request
    * @param {*} res the user's response
    * @param {*} next nextFunction to further spread information
    */
  static deleteAllLogs(req, res, next) {
    logModel.destroy({
      where: {
        userId: req.session.userId
      }
    }).then((result) => {
      Response.sendOkResponseMsg(res, '日志删除成功！', null);
    }).catch((err) => {
      console.log(err);
      next(createError(404, "日志删除失败！"));
    })
  }

}

module.exports = LogService;