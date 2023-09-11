const { sprintf } = require('sprintf-js');
const { client, params, requestOption } = require('../config/message/aliyunMessageConfig');
const randomUtil = require('../utils/randomUtil');
const createError = require('http-errors');
class messageService {

    constructor() {

    }

    static sendMessageAsync(req, res, next) {
        params.PhoneNumbers = req.body.phone;
        let code = randomUtil.getRandomNumbers(6);
        params.TemplateParam = sprintf("{\"code\":\"%s\"}", code);
        client.request('SendSms', params, requestOption).then(() => {
            req.code = code;
            next();
        }).catch(() => {
            next(createError(500, "短信发送失败！"));
        })
    }

}

module.exports = messageService;