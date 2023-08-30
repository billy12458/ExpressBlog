const createError = require('http-errors');
const { likeRedisClient } = require('../config/redis/redisClient');
const Response = require('../utils/ResponseUtil');

class likeService {

    static likeBlog(req, res, next) {
        likeRedisClient.zadd(req.params.blogId, Date.now(), req.session.userId)
            .then(() => {
                Response.sendOkResponseMsg(res, '点赞成功！', null);
            }).catch((err) => {
                next(createError(500, "点赞失败！"));
            });
    }

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

    static getLikesCountById(req, res, next) {
        likeRedisClient.zcount(req.params.blogId, 0, Infinity)
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch((err) => {
                next(createError(500, "查询失败！"));
            });
    }

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