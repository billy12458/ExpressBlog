const mongoose = require('mongoose');
const moment = require('moment');
const random = require('string-random');

// 定义博客模式
const blogSchema = new mongoose.Schema({
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
        minlength: 36,
        maxlength: 36,
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

// 创建博客模型
const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel;