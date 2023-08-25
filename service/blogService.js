const { blogModel } = require('../config/mongooseConfig');
const filter = require('bad-words-chinese');
const Response = require('../utils/ResponseUtil');
const {redisClient} = require('../config/redisClient');

class blogService {

    constructor() {

    }

    static async createBlog(req, res) {
        await blogModel.create({ ...req.body, }).then(() => {
            Response.sendOkResponseMsg(res, '博客创建成功！', null);
        });
    }

    static async findBlogsByTitle(req, res) {
        var result = await blogModel.find({ title: new RegExp(req.params.title) })
            .sort({ publishDate: -1 }).exec();
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static async getPagedBlogsByTitle(req, res) {
        let { pageNum, pageSize } = req.query;
        var result = await blogModel.paginate({ title: new RegExp(req.params.title) }, { page: pageNum, limit: pageSize });
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static async getPagedBlogsByUserId(req, res) {
        let { pageNum, pageSize } = req.query;
        var result = await blogModel
            .paginate(blogModel.find({ userId: req.params.userId })
            .select(['userId', 'blogId', 'userName', 'title', 'tags', 'publishDate']), { page: pageNum, limit: pageSize });
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static async getBlogById(req, res) {
        let {blogId} = req.params;
        var result = await blogModel.find({blogId: blogId}).exec();
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

    static async getBlogViewById(req, res) {
        let { blogId } = req.params;
        var result = Number(await redisClient.pfcount(blogId));
        Response.sendOkResponseMsg(res, '查询成功！', result);
    }

}

module.exports = blogService;