const { blogModel } = require('../config/mongooseConfig');
const Response = require('../utils/ResponseUtil');
const { redisClient } = require('../config/redisClient');
const createError = require('http-errors');

// 后面稍微重构一下代码
class blogService {

    constructor() {

    }

    static createBlog(req, res, next) {
        blogModel.create({ ...req.body, }).then(() => {
            Response.sendOkResponseMsg(res, '博客创建成功！', null);
        }).catch(() => {
            next(createError(500, '博客创建失败！'));
        });
    }

    static deleteBlog(req, res, next) {
        blogModel.deleteOne({
            blogId: req.params.id,
            userId: req.session.userId
        }).then(() => {
            Response.sendOkResponseMsg(res, '博客删除成功！', null);
        }).catch(() => {
            next(createError(500, '博客删除失败！'));
        });
    }

    static async findBlogsByTitle(req, res) {
        var result = await blogModel.find({ title: new RegExp(req.params.title) })
            .sort({ publishDate: -1 }).exec();
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static getMyPagedBlogs(req, res, next) {
        let { pageNum, pageSize } = req.query;
        blogModel.paginate({ userId: req.session.userId }, { page: pageNum, limit: pageSize })
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch(() => {
                next(createError(555, '分页查询失败！'));
            });
    }

    static getPagedBlogsByTitle(req, res, next) {
        let { pageNum, pageSize } = req.query;
        blogModel.paginate({ title: new RegExp(req.params.title) }, { page: pageNum, limit: pageSize })
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch(() => {
                next(createError(500, '分页查询失败！'));
            });
    }

    static getPagedBlogsByUserId(req, res, next) {
        let { pageNum, pageSize } = req.query;
        blogModel.paginate(blogModel.find({ userId: req.params.userId })
            .select(['userId', 'blogId', 'userName', 'title', 'tags', 'publishDate']), { page: pageNum, limit: pageSize })
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch(() => {
                next(createError(500, '分页查询失败！'));
            });
    }

    static getPagedBlogsByTags(req, res) {
        let { pageNum, pageSize } = req.query;
        blogModel.paginate(blogModel.find({ tags: { $in: req.body.tags } })
            .select(['userId', 'blogId', 'userName', 'title', 'tags', 'publishDate']), { page: pageNum, limit: pageSize })
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch(() => {
                next(createError(500, '分页查询失败！'));
            });
    }

    static async getBlogById(req, res) {
        let { blogId } = req.params;
        var result = await blogModel.find({ blogId: blogId }).exec();
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static async getBlogViewById(req, res) {
        let { blogId } = req.params;
        var result = Number(await redisClient.pfcount(blogId));
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

}

module.exports = blogService;