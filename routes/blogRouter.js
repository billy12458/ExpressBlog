const express = require("express")
const blogService = require('../service/blogService');
const blogViewMiddleware = require('../middleware/blog/blogViewMiddleware');
const blogCensorMiddleware = require('../middleware/blog/blogCensorMiddleware');
const pageParamMiddleware = require('../middleware/validate/pageParamMiddleware');
const { isLoginMiddleware } = require("../middleware/user/isLoginMiddleware");

var blogRouter = express.Router();

blogRouter.all('*', isLoginMiddleware);

blogRouter.put('/create', [blogCensorMiddleware], function (req, res, next) {
  blogService.createBlog(req, res, next);
});

blogRouter.put('/random', function (req, res, next) {
  blogService.blogRecommendation(req, res, next);
});

blogRouter.post('/my/paged', [pageParamMiddleware], function (req, res, next) {
  blogService.getMyPagedBlogs(req, res, next);
});

blogRouter.get('/count/:blogId', function (req, res) {
  blogService.getBlogViewById(req, res);
});

blogRouter.get('/totalNum', function (req, res, next) {
  blogService.getBlogsCountByUser(req, res, next);
});

blogRouter.put('/search/title/:title/paged', [pageParamMiddleware], function (req, res, next) {
  blogService.getPagedBlogsByTitle(req, res, next);
});

blogRouter.put('/search/tags/paged', [pageParamMiddleware], function (req, res, next) {
  blogService.getPagedBlogsByTags(req, res, next);
});

blogRouter.put('/search/title/:title', function (req, res) {
  blogService.findBlogsByTitle(req, res);
});

blogRouter.post('/search/user/:userId/paged', [pageParamMiddleware], function (req, res, next) {
  blogService.getPagedBlogsByUserId(req, res, next);
});

blogRouter.post('/blog/:blogId', [blogViewMiddleware], function (req, res, next) {
  blogService.getBlogById(req, res, next);
});

blogRouter.delete('/delete/:blogId', [blogViewMiddleware], function (req, res, next) {
  blogService.deleteBlog(req, res, next);
});

module.exports = blogRouter;