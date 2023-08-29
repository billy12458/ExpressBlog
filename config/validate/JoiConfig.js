const Joi = require('joi');

const updateSchema = Joi.object({
    email: Joi.string().forbidden().error(new Error("不能以此接口修改邮箱！")),
    phone: Joi.string().forbidden().error(new Error("不能以此接口修改手机号码！")),
})

module.exports = {
    updateSchema
}