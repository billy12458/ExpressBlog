const AipContentCensorClient = require("baidu-aip-sdk").contentCensor;

// 设置APPID/AK/SK，这些信息可以在百度智能云控制台查到，前提你要先开通内容审核服务
var APP_ID = process.env.AIP_APP_ID;
var API_KEY = process.env.AIP_APP_KEY;
var SECRET_KEY = process.env.AIP_APP_SECRET;

// 新建一个对象，建议只保存一个对象调用服务接口
module.exports = {
    client: new AipContentCensorClient(APP_ID, API_KEY, SECRET_KEY)
}
