const createError = require('http-errors');
const { blogModel } =require('../../config/mongooseConfig');

var blogExistMiddleware = function (req, res, next) {
    blogModel.exists({blogId: req.params.blogId}).exec().then((result) => {
        if(result)
            next();
        else
            next(createError(404, "博客不存在，无法点赞！"));
    }).catch((err) => {
        next(createError(404, err.message));
    });
}

module.exports = blogExistMiddleware;
