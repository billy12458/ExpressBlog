const Joi = require('joi');

const updateSchema = Joi.object({
    email: Joi.string().forbidden().error(new Error("不能以此接口修改邮箱！")),
    phone: Joi.string().forbidden().error(new Error("不能以此接口修改手机号码！")),
})

const pagedSchema = Joi.object({
    pageNum: Joi.string().required().error(new Error("缺失pageNum参数！")),
    pageSize: Joi.string().required().error(new Error("缺失pageSize参数！")),
})

const emailSchema = Joi.object().keys({
    email: Joi.string().required().email().error(new Error("邮箱不符合规范！")),
    code: Joi.string().required().length(8).error(new Error("验证码不符合规范！")),
}).length(2).error(new Error("数据不符合规范！"))

module.exports = {
    updateSchema,
    pagedSchema,
    emailSchema
}