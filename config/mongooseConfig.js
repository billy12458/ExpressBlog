const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
const random = require('string-random');

dotenv.config();
let connectString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/express`;
let connectString1 = 'mongodb://bill27897java:vc2022java27897%2B%3DAESmongo@localhost:27017/express?authMechanism=DEFAULT&authSource=admin';
mongoose.connect(connectString1, {
    bufferCommands: true,
    // user: process.env.MONGO_USERNAME,
    // pass: process.env.MONGO_PASSWORD,
    minPoolSize: 50,
    maxPoolSize: 400,
    // authMechanism: 'DEFAULT',
    // authSource: 'admin'
})

var db = mongoose.connection;

db.on('open', () => {
    console.log("connection opened!");
});
db.on('close', () => {
    console.log("connection closed!");
});

var blogSchema = null;
var sessionSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    expires: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    session: {
        type: String,
        unique: true,
        required: true,
    },
});
// 定义博客模式
var blogSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
        default: random(16, {
            numbers: true,
            letters: true,
            specials: false
        })
    },
    title: {
        type: String,
        required: true,
        text: true
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        maxlength: 20,
        immutable: true
    },
    userName: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        default: moment().toDate(),
    },
    tags: Array
    // 可以根据需求定义其他字段，如标签、评论等
});
blogSchema.plugin(mongoosePaginate);

// 创建博客模型
var blogModel = mongoose.model('blogs', blogSchema, 'blogs');
var sessionModel = mongoose.model('sessions', sessionSchema, 'sessions');

module.exports = {
    sessionModel,
    blogModel
}