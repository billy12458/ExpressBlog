const xss = require('xss');

// you can use advanced configurations of xss-interface IFilterXSSOptions
let middleware = function (req, res, next) {
    if (req.body) {
        req.body = JSON.parse(xss(JSON.stringify(req.body)));
    } if (req.query) {
        req.query = JSON.parse(xss(JSON.stringify(req.query)));
    } if (req.params) {
        req.params = JSON.parse(xss(JSON.stringify(req.params)));
    }
    next();
}

module.exports = middleware;