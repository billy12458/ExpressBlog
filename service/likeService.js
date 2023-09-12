const createError = require('http-errors');
const { likeRedisClient } = require('../config/redis/redisClient');
const Response = require('../utils/ResponseUtil');
const userService = require('./userService');

class likeService {

    /**
     * like a specific blog (with redis zset)
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static likeBlog(req, res, next) {
        likeRedisClient.zadd(req.params.blogId, Date.now(), req.session.userId)
            .then(() => {
                Response.sendOkResponseMsg(res, '点赞成功！', null);
            }).catch((err) => {
                next(createError(500, "点赞失败！"));
            });
    }

    /**
     * cancel like on a specific blog (with redis zset)
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static cancelLikeBlog(req, res, next) {
        if (this.isLikedById(req, res, next) == null)
            next(createError(500, "您还未点赞！"));
        else {
            likeRedisClient.zrem(req.query.blogId, req.session.userId).then(() => {
                Response.sendOkResponseMsg(res, '取消点赞成功！', null);
            }).catch((err) => {
                next(createError(500, "取消点赞失败！"));
            });
        }
    }

    /**
     * get the total number of likes of a blog (with redis zset)
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static getLikesCountById(req, res, next) {
        likeRedisClient.zcount(req.params.blogId, 0, Infinity)
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch((err) => {
                next(createError(500, "查询失败！"));
            });
    }

    /**
     * Retrieve the userId of the last user who liked the blog
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static getLastLikeUserIdById(req, res, next) {
        likeRedisClient.zrevrangebyscoreBuffer(req.params.blogId, Number.MAX_VALUE, 0, 'LIMIT', 0, 1).then((result) => {
            Response.sendOkResponseMsg(res, '查询成功！', result[0].toString());
        }).catch((err) => {
            next(createError(500, "查询失败！"));
        });
    }

    /**
     * Retrieve the user info of the last user who liked the blog
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static getLastLikeInfoById(req, res, next) {
        likeRedisClient.zrevrangebyscoreBuffer(req.params.blogId, Number.MAX_VALUE, 0, 'LIMIT', 0, 1).then((result) => {
            req.params.userId = result[0].toString();
            userService.getOthersUserInfoById(req, res, next);
        }).catch(() => {
            next(createError(500, "查询失败！"));
        });
    }

    /**
     * whether a specific blog is liked by the user (with redis zset)
     * @param {*} req user's request
     * @param {*} res user's response
     * @param {*} next nextFunction
     */
    static getIsLikedById(req, res, next) {
        this.isLikedById(req, res, next).then((result) => {
            Response.sendOkResponseMsg(res, '查询成功！', result == null ? false : true);
        }).catch((err) => {
            next(createError(500, "查询失败！"));
        });
    }

    static async isLikedById(req, res, next) {
        return await likeRedisClient.zrank(req.query.blogId, req.session.userId);
    }

}

module.exports = likeService;