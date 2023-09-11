const express = require('express');
const { cryptoService } = require('../service/cryptoService');

var cryptoRouter = express.Router();
// cryptoRouter.all('*', isLoginMiddleware);

cryptoRouter.post('/md5/simple/:text', function (req, res) {
    cryptoService.generateSimpleMD5(req, res);
})

cryptoRouter.post('/md5/hmac', function (req, res) {
    cryptoService.generateHMacMD5(req, res);
})

cryptoRouter.post('/sha1/simple', function (req, res) {
    cryptoService.generateSimpleSHA1(req, res);
})

cryptoRouter.post('/sha1/hmac', function (req, res) {
    cryptoService.generateHMacSHA1(req, res);
})

cryptoRouter.post('/sha224/simple', function (req, res) {
    cryptoService.generateSimpleSHA224(req, res);
})

cryptoRouter.post('/sha224/hmac', function (req, res) {
    cryptoService.generateHMacSHA224(req, res);
})

cryptoRouter.post('/sha256/simple', function (req, res) {
    cryptoService.generateSimpleSHA256(req, res);
})

cryptoRouter.post('/sha256/hmac', function (req, res) {
    cryptoService.generateHMacSHA256(req, res);
})

cryptoRouter.post('/sha384/simple', function (req, res) {
    cryptoService.generateSimpleSHA384(req, res);
})

cryptoRouter.post('/sha384/hmac', function (req, res) {
    cryptoService.generateHMacSHA384(req, res);
})

cryptoRouter.post('/sha512/simple', function (req, res) {
    cryptoService.generateSimpleSHA512(req, res);
})

cryptoRouter.post('/sha512/hmac', function (req, res) {
    cryptoService.generateHMacSHA512(req, res);
})

cryptoRouter.post('/bcrypt/encrypt', async function (req, res) {
    await cryptoService.generateBcryptText(req, res);
})

cryptoRouter.post('/des/encrypt', function (req, res) {
    cryptoService.encryptDES(req, res);
})

cryptoRouter.post('/aes/encrypt', function (req, res) {
    cryptoService.encryptAES(req, res);
})

cryptoRouter.post('/des/decrypt', function (req, res) {
    cryptoService.decryptDES(req, res);
})

module.exports = cryptoRouter;