
const moment = require('moment');
const random = require('string-random');
const { DataTypes } = require('sequelize');
const mysqlSequelize = require('../config/sequelize/sequelize');

const Log = mysqlSequelize.define('logs', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            len: 12
        }
    },
    loginTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "login log loginTime",
        // validate: {
        //     isDate: true
        // }
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    loginIp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIP: true
        }
    },
    system: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "未知系统"
    },
    browser: {
        type: DataTypes.CHAR,
        allowNull: true,
        defaultValue: "未知浏览器"
    },
}, {
    hooks: {
        beforeValidate: (log, options) => {
            log.loginTime = moment().toDate();
            log.logId = (random(12, {
                specials: false,
                numbers: true,
                letters: false
            }));
        }
    },
    freezeTableName: true,
    timestamps: true,
    version: true
}, {});
// Log.sync({force: true});

module.exports = Log;