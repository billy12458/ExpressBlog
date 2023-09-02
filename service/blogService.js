const { blogModel } = require('../config/mongooseConfig');
const Response = require('../utils/ResponseUtil');
const { redisClient } = require('../config/redis/redisClient');
const createError = require('http-errors');

// 后面稍微重构一下代码
class blogService {

    constructor() {

    }

    /**
     * Creates a new blog (in login status) after it went through content censor
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
    static createBlog(req, res, next) {
        blogModel.create({ ...req.body, userId: req.session.userId }).then(() => {
            Response.sendOkResponseMsg(res, '博客创建成功！', null);
        }).catch((err) => {
            console.log(err.message);
            next(createError(500, '博客创建失败！'));
        });
    }

    /**
     * Deletes an existing blog (in login status)
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
    static deleteBlog(req, res, next) {
        blogModel.deleteOne({
            blogId: req.params.blogId,
            userId: req.session.userId
        }).then(() => {
            Response.sendOkResponseMsg(res, '博客删除成功！', null);
        }).catch(() => {
            next(createError(500, '博客删除失败！'));
        });
    }

    /**
     * Finds all blogs that matches the title regular expression, use `sort()` to display by `publishDate`.
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
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

    /**
     * Retrieve blogs with the help of pagination.
     * Behave like `getMyPagedBlogs(req, res, next)`, but focus more on titles
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
    static getPagedBlogsByTitle(req, res, next) {
        let { pageNum, pageSize } = req.query;
        blogModel.paginate({ title: new RegExp(req.params.title) }, { page: pageNum, limit: pageSize })
            .then((result) => {
                Response.sendOkResponseMsg(res, '查询成功！', result);
            }).catch(() => {
                next(createError(500, '分页查询失败！'));
            });
    }

    /**
     * Retrieve blogs with the help of pagination.
     * Behave like `getMyPagedBlogs(req, res, next)`, but focus more on userIds
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
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

    /**
     * Retrieve blogs with the help of pagination.
     * Behave like `getMyPagedBlogs(req, res, next)`, but focus more on tags
     * @param {*} req the user's request
     * @param {*} res the user's response
     * @param {*} next nextFunction
     */
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

    static getBlogById(req, res) {
        let { blogId } = req.params;
        blogModel.find({ blogId: blogId }).exec().then((result) => {
            Response.sendOkResponseMsg(res, '查询成功！', result);
        }).catch(() => {
            next(createError(500, '查询失败！'));
        });
    }

    /**
     * get the total number of views a blog has gained
     * @param {*} req the user's request
     * @param {*} res the user's corresponding response
     */
    static async getBlogViewById(req, res) {
        let { blogId } = req.params;
        var result = Number(await redisClient.pfcount(blogId));
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    /**
     * get the total number of blogs a user has
     * @param {*} req the user's request
     * @param {*} res the user's corresponding response
     * @param {*} next nextFunction
     */
    static getBlogsCountByUser(req, res, next) {
        blogModel.count({ userId: req.body.userId }).exec()
            .then((result) => {
                Response.sendOkResponseMsg(res, '总数查询成功！', result);
            }).catch(() => {
                next(createError(500, '分页查询失败！'));
            });
    }

    /**
     * pick 10 random blogs from the database, we use `$sample` operator to achieve our goal
     * @param {*} req the user's request
     * @param {*} res the user's corresponding response
     * @param {*} next nextFunction
     */
    static blogRecommendation(req, res, next) {
        blogModel.aggregate([
            { $sample: { size: 10 } }
        ]).then(results => {
            Response.sendOkResponseMsg(res, '推荐成功！', results);
        }).catch(() => {
            next(createError(500, '推荐失败！'));
        });
    }
}

module.exports = blogService;