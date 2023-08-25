const express = require("express")
var registerService = require('../service/registerService');

var registerRouter = express.Router();
registerRouter.post('/register/sure', (req, res) => {
  registerService.registerUser(req, res);
})

module.exports = registerRouter;