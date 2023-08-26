const {client} = require('../config/baidu/contentCensorClient'); 
const createError = require('http-errors');

var censorMiddleware = function (req, res, next) {
    let resultString = [];
    client.textCensorUserDefined(req.body.title.concat(req.body.content)).then(function(data) {
        if(data.conclusion === '合规')
            next();
        else {
            data.data.forEach(element => {
                resultString.push(element.msg);
            });
            next(createError(545, resultString.join(',')));
        }
    }, function(e) {
        console.log(e)
    });
}

module.exports = censorMiddleware;