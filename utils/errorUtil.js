class errorUtil {

    constructor() {

    }

    static sendDefaultError(res, err, next) {
      res.statusCode = 500;
      res.message = "操作失败！";
      next(err)
    }

    static sendCustomError(res, statusCode, message, err, next) {
      res.statusCode = statusCode;
      res.message = message;
      next(err);
    }
}

module.exports = errorUtil;