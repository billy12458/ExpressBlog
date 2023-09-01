const moment = require('moment');
const random = require('string-random');
const { DataTypes } = require('sequelize');
const mysqlSequelize = require('../config/sequelize/sequelize');

const Suggestion = mysqlSequelize.define('suggestion', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            min: 5,
            max: 80
        },
        comment: "suggestion title",
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            min: 10,
            max: 500
        },
        comment: "suggestion content",
    },
    suggestionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            len: 8
        }
    },
    commitTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "suggestion commitTime",
    },
    modifyTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "suggestion modifyTime",
    },
    completed: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "暂未收到回复！",
    },
    leftNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5,
        set: function (value) {
            this.setDataValue('leftNum', value - 1);
        }
    }
}, {
    hooks: {
        beforeValidate: (suggestion, options) => {
            suggestion.commitTime = moment().toDate();
            suggestion.modifyTime = moment().add(7, 'days').toDate();
            suggestion.suggestionId = (random(8, {
                specials: false,
                numbers: true,
                letters: true
            }));
            suggestion.completed = 0
        }
    },
    freezeTableName: true,
    timestamps: false,
    version: true
}, {});
// Suggestion.sync({force: true});

module.exports = Suggestion;