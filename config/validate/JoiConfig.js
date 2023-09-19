const Joi = require('joi');

// use abortEarly(false) to gather all the error messages!
const updateSchema = Joi.object({
    userName: Joi.string().min(4).max(20).error(new Error("用户名不符合规范！")),
    userId: Joi.string().forbidden().error(new Error("不能修改用户ID！")),
    email: Joi.string().forbidden().error(new Error("不能以此接口修改邮箱！")),
    phone: Joi.string().forbidden().error(new Error("不能以此接口修改手机号码！")),
    age: Joi.number().greater(0).less(200).error(new Error("年龄不符合规范！")),
    sex: Joi.string().valid('男', '女', '保密').error(new Error("性别不符合规范！")),
    motto: Joi.string().min(10).max(50).error(new Error('简介不符合规范！'))
}).options({ abortEarly: false }).unknown(true);

// again check the register api after this is finished!
const registerSchema = Joi.object({
    userId: Joi.string().length(13).required().error(new Error("userId不符合规范！")),
    userName: Joi.string().min(4).max(20).required().error(new Error("用户名不符合规范！")),
    password: Joi.string().min(8).max(32).required().error(new Error("密码长度必须在8-32位！")),
    // age: Joi.number().greater(0).less(200).required().error(new Error("年龄不符合规范！")),
    email: Joi.string().email().required().error(new Error("邮箱不符合规范！")),
    // phone: Joi.string().required().error(new Error("手机号不符合规范！")),
    sex: Joi.string().valid('男', '女', '保密').required().error(new Error("性别不符合规范！")),
    start_date: Joi.date().required().error(new Error("开始时间不符合规范！"))
})

const loginSchema = Joi.object({
    userId: Joi.string().required().error(new Error("用户名/邮箱/手机号不能为空！")),
    password: Joi.string().required().error(new Error("密码不能为空！")),
});

const pagedSchema = Joi.object({
    pageNum: Joi.number().required().error(new Error("缺失pageNum参数！")),
    pageSize: Joi.number().min(0).max(50).required().error(new Error("pageSize参数不符合规范！")),
})

const emailSchema = Joi.object().keys({
    email: Joi.string().required().email().error(new Error("邮箱不符合规范！")),
    code: Joi.string().length(8).error(new Error("验证码不符合规范！")),
});

const phoneSchema = Joi.object().keys({
    phone: Joi.string().required().length(11).error(new Error("手机号码不符合规范！")),
    code: Joi.string().required().length(6).error(new Error("验证码不符合规范！")),
});

const passwordSchema = Joi.object({
    email: Joi.string().required().email().error(new Error("邮箱不符合规范！")),
    password: Joi.string().required().min(8).max(32).error(new Error("密码不符合规范！")),
    newPassword: Joi.string().required().min(8).max(32).error(new Error("密码不符合规范！")),
    code: Joi.string().length(8).error(new Error("验证码不符合规范！")),
});

module.exports = {
    loginSchema,
    registerSchema,
    updateSchema,
    pagedSchema,
    emailSchema,
    phoneSchema,
    passwordSchema
}