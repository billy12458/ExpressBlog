const AipContentCensorClient = require("baidu-aip-sdk").contentCensor;

// 设置APPID/AK/SK
var APP_ID = process.env.AIP_APP_ID;
var API_KEY = process.env.AIP_APP_KEY;
var SECRET_KEY = process.env.AIP_APP_SECRET;

// 新建一个对象，建议只保存一个对象调用服务接口
module.exports = {
    client: new AipContentCensorClient(APP_ID, API_KEY, SECRET_KEY)
}
