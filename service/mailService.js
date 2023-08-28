const { transporter, activateMailOptions, authenticationMailOptions, defaultMailOptions } = require('../config/mailConfig');
const Response = require('../utils/ResponseUtil');
const createError = require('http-errors');
const random = require('string-random');
const sprintf = require('sprintf-js');

class mailService {

    constructor() {

    }

    static sendActivationCode(req, res, next) {
        activateMailOptions.to = req.body.email;
        var code = random(8, {
            numbers: true,
            specials: false,
            letters: false
        });
        transporter.sendMail(activateMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                next(createError(500, "邮件发送失败！"))
            } else {
                Response.sendOkResponseMsg(res, '发送成功！', info.response);
            }
        })
    }

    static sendTestMail(req, res, next) {
        defaultMailOptions.to = req.params.email
        transporter.sendMail(defaultMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                next(createError(500, "邮件发送失败！"))
            } else {
                Response.sendOkResponseMsg(res, '发送成功！', info.response);
            }
        });
    }

}

module.exports = mailService;