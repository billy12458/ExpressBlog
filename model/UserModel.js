const { DataTypes } = require('sequelize');
const mysqlSequelize = require('../config/sequelize/sequelize');
const { statusClient } = require('../config/redis/redisClient');
const encrypt = require('../utils/encryptUtil');
const moment = require('moment');
const random = require('string-random');

const User = mysqlSequelize.define('User', {
    // 在这里定义模型属性
    userId: {
        type: DataTypes.STRING,
        // defaultValue: uuid.v4(),
        allowNull: false,
        primaryKey: true,
        unique: true,
        comment: 'blog table userId'
    },
    userName: {
        type: DataTypes.STRING,
        comment: 'blog userName',
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 200
        }
    },
    avatar: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "用户的头像"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: "用户手机号字段",
        validate: {
            isNumeric: true
        }
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '保密',
        // validate: {
        //     isIn: ['男', '女', '保密']
        // }
    },
    motto: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "这个人很懒，什么都没有写！",
        comment: "用户的个人简介！"
    },
    start_date: {
        type: DataTypes.DATE,
        defaultValue: moment().toDate(),
        validate: {
            isDate: true
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
    version: true
}, {
    // 这是其他模型参数
});

User.addHook('beforeValidate', async (user, options) => {
    options.skip = ['start_date', 'password', 'userId', 'email']
});

User.addHook('beforeCreate', async (user, options) => {
    user.start_date = moment().toDate();
    user.password = await encrypt.generatePassword(user.password, Number(process.env.PASS_ITERATION));
    user.userId = '用户_'.concat(random(10, {
        specials: false,
        numbers: true,
        letters: false
    }));
    statusClient.hset(user.userId, new Map().set('startDate', moment().format()));
});

// 在这里可以添加Joi数据校验
User.addHook('beforeUpdate', async (user, options) => {

});

// var cacher = require('sequelize-redis-cache');
// var redis = require('ioredis').default;

// var rc = new redis();
// var db = mysqlSequelize;
// var cacheObj = cacher(db, rc)
//     .model("User")
//     .ttl(300);
// cacheObj.query('select email from user where age > 20 order by start_date asc').then(function (row) {
//     console.log(row); // sequelize db object
//     console.log(cacheObj.cacheHit); // true or false
// });
// User.sync({force: true});

module.exports = User;

// console.log(User === mysqlSequelize.models.User)