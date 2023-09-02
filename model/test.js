
// var cacher = require('sequelize-redis-cache');
// var redis = require('redis');
// var { Sequelize, Op } = require('sequelize');

// var rc = redis.createClient(6379, 'localhost');
// var db = new Sequelize('express', 'root', '123456', { dialect: 'mysql' });
// console.log(db.isDefined('user'))
// console.log(db.isDefined('User'))
// console.log(db.isDefined('Users'))
// console.log(db.isDefined('users'))
// var cacheObj = cacher(db, rc)
//     .model("User")
//     .ttl(300);

// module.exports = cacheObj;