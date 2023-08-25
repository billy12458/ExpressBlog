const AipContentCensorClient = require("baidu-aip-sdk").contentCensor;

// 设置APPID/AK/SK
var APP_ID = "26808368";
var API_KEY = "7Ee0aGASgRWbGX4HGUPHExMh";
var SECRET_KEY = "3RZkr8Nos6kSZLZw0novyZnSL1c98pir";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipContentCensorClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = {
    client
}
