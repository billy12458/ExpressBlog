var express = require('express');
const suggestionService = require('../service/suggestionService');
const blogCensorMiddleware = require('../middleware/blog/blogCensorMiddleware');
const pageParamMiddleware = require('../middleware/validate/pageParamMiddleware');
const modifyMiddleware = require('../middleware/suggestion/modifyMiddleware');

var suggestionRouter = express.Router();
suggestionRouter.put('/commit', [blogCensorMiddleware], function (req, res, next) {
  suggestionService.saveSuggestion(req, res, next);
});

suggestionRouter.patch('/get/:id', function (req, res, next) {
  suggestionService.getSuggestionById(req, res, next);
});

suggestionRouter.post('/my/paged', [pageParamMiddleware], function (req, res, next) {
  suggestionService.getPagedSuggestions(req, res, next, null);
});

suggestionRouter.post('/my/paged/completed', [pageParamMiddleware], function (req, res, next) {
  suggestionService.getPagedSuggestions(req, res, next, true);
});

suggestionRouter.post('/my/paged/completed/not', [pageParamMiddleware], function (req, res, next) {
  suggestionService.getPagedSuggestions(req, res, next, false);
});

suggestionRouter.post('/my/modify/:suggestId', [modifyMiddleware], function (req, res, next) {
  suggestionService.modifySuggestion(req, res, next);
});

module.exports = suggestionRouter;
