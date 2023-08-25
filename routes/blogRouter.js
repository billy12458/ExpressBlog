const express = require("express")
const blogService = require('../service/blogService');
const blogViewMiddleware = require('../middleware/blogViewMiddleware');

var blogRouter = express.Router();
blogRouter.put('/create', function (req, res) {
  blogService.createBlog(req, res);
});

blogRouter.get('/count/:blogId', function (req, res) {
  blogService.getBlogViewById(req, res);
});

blogRouter.put('/search/title/:title/paged', function (req, res) {
  blogService.getPagedBlogsByTitle(req, res);
});

blogRouter.put('/search/title/:title', function (req, res) {
  blogService.findBlogsByTitle(req, res);
});

blogRouter.post('/search/user/:userId/paged', function (req, res) {
  blogService.getPagedBlogsByUserId(req, res);
});

blogRouter.post('/blog/:blogId', [blogViewMiddleware], function (req, res, next) {
  blogService.getBlogById(req, res);
});

module.exports = blogRouter;