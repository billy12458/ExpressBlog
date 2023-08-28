const nodemailer = require('nodemailer');

// 创建一个用于发送邮件的传输器对象
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    service: 'foxmail', // 使用的邮件服务提供商
    auth: {
        user: process.env.MAIL_USER, // 发件人的邮箱账号
        pass: process.env.MAIL_PASS, // 发件人的邮箱密码或授权码
    },
});

// 激活账号的邮件内容
const activateMailOptions = {
    from: process.env.MAIL_USER, // 发件人邮箱
    to: null, // 收件人邮箱
    subject: process.env.ACTIVATE_MAIL_SUBJECT, // 邮件主题
    text: process.env.ACTIVATE_TEXT, // 邮件正文
};

const authenticationMailOptions = {
    from: process.env.MAIL_USER, // 发件人邮箱
    to: null, // 收件人邮箱
    subject: process.env.AUTHENTICATE_MAIL_SUBJECT, // 邮件主题
    text: null, // 邮件正文
};

const defaultMailOptions = {
    from: process.env.MAIL_USER, // 发件人邮箱
    to: null, // 收件人邮箱
    subject: process.env.AUTHENTICATE_MAIL_SUBJECT, // 邮件主题
    text: "Nodejs test mail by ExpressBlog", // 邮件正文
}

module.exports = {
    transporter,
    activateMailOptions,
    authenticationMailOptions,
    defaultMailOptions
}