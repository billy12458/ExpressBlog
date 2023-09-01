const { transporter, activateMailOptions, authenticationMailOptions, defaultMailOptions } = require('../config/mailConfig');
const Response = require('../utils/ResponseUtil');
const createError = require('http-errors');
const random = require('string-random');
const { sprintf } = require('sprintf-js');

class mailService {

    constructor() {

    }

    static sendActivationCode(req, mail, res, next) {
        var code = random(8, {
            numbers: true,
            specials: false,
            letters: false
        });
        activateMailOptions.to = mail != null ? mail : req.body.email;
        activateMailOptions.text = sprintf(process.env.ACTIVATE_TEXT, code);
        transporter.sendMail(activateMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                next(createError(500, "邮件发送失败！"))
            } else {
                req.code = code;
                next();
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