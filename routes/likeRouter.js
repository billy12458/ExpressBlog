const express = require('express')
const likeService = require('../service/likeService');
const blogExistMiddleware = require('../middleware/blog/blogExistMiddleware');
const { isLoginMiddleware } = require('../middleware/user/isLoginMiddleware');

var likeRouter = express.Router();

likeRouter.all('*', isLoginMiddleware);

likeRouter.put('/blog/:blogId', [blogExistMiddleware], function (req, res, next) {
    likeService.likeBlog(req, res, next);
})

likeRouter.put('/count/:blogId', function (req, res, next) {
    likeService.getLikesCountById(req, res, next);
})

likeRouter.put('/lastlike/:blogId', [blogExistMiddleware], function (req, res, next) {
    likeService.getLastLikeUserIdById(req, res, next);
})

likeRouter.post('/lastlike/:blogId/info', [blogExistMiddleware], function (req, res, next) {
    likeService.getLastLikeInfoById(req, res, next);
})

likeRouter.get('/isLiked', function (req, res, next) {
    likeService.getIsLikedById(req, res, next);
})

likeRouter.post('/cancel', function (req, res, next) {
    likeService.cancelLikeBlog(req, res, next);
})

module.exports = likeRouter;