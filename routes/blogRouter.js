const express = require("express")
const blogService = require('../service/blogService');
const blogViewMiddleware = require('../middleware/blogViewMiddleware');
const blogCensorMiddleware = require('../middleware/blogCensorMiddleware');

var blogRouter = express.Router();
blogRouter.put('/create', [blogCensorMiddleware], function (req, res, next) {
  blogService.createBlog(req, res, next);
});

blogRouter.post('/my/paged', function(req, res, next) {
  blogService.getMyPagedBlogs(req, res, next);
});

blogRouter.get('/count/:blogId', function (req, res) {
  blogService.getBlogViewById(req, res);
});

blogRouter.get('/totalNum', function (req, res, next) {
  blogService.getBlogsCountByUser(req, res, next);
});

blogRouter.put('/search/title/:title/paged', function (req, res, next) {
  blogService.getPagedBlogsByTitle(req, res, next);
});

blogRouter.put('/search/tags/paged', function (req, res) {
  blogService.getPagedBlogsByTags(req, res);
});

blogRouter.put('/search/title/:title', function (req, res) {
  blogService.findBlogsByTitle(req, res);
});

blogRouter.post('/search/user/:userId/paged', function (req, res, next) {
  blogService.getPagedBlogsByUserId(req, res, next);
});

blogRouter.post('/blog/:blogId', [blogViewMiddleware], function (req, res, next) {
  blogService.getBlogById(req, res);
});

blogRouter.delete('/delete/:blogId', [blogViewMiddleware], function (req, res, next) {
  blogService.deleteBlog(req, res, next);
});

module.exports = blogRouter;