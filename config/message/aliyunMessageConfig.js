const Core = require('@alicloud/pop-core');

var client = new Core({
    // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.
    accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
    accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    // securityToken: process.env['ALIBABA_CLOUD_SECURITY_TOKEN'], // use STS Token
    endpoint: process.env['ALIBABA_ENDPOINT'],
    apiVersion: process.env['ALIBABA_API_VERSION']
});

// "{\"code\":\"1234\"}"
var params = {
    "PhoneNumbers": null,
    "SignName": process.env['ALIBABA_MESSAGE_SIGNNAME'],
    "TemplateCode": process.env['ALIBABA_MESSAGE_TEMPLATE_CODE'],
    "TemplateParam": null
}

var requestOption = {
    method: 'POST',
    formatParams: false,
};

module.exports = {
    client,
    params,
    requestOption
}