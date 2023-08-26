const express = require("express")
var registerService = require('../service/registerService');

var registerRouter = express.Router();
registerRouter.post('/register/sure', (req, res, next) => {
  registerService.registerUser(req, res, next);
})

module.exports = registerRouter;