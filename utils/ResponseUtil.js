class ResponseUtil {

    constructor() {
        
    }

    static sendOkResponse(res, result) {
        res.status(200).json({
            data: result,
            msg: "操作成功！",
            status: 200
        });
    }

    static sendOkResponseMsg(res, msg, result) {
        res.status(200).json({
            data: result,
            msg: msg,
            status: 200
        });
    }

    static sendOkResponseWithCode(res, result, code) {
        res.status(200).json({
            data: result,
            msg: "操作成功！",
            status: code
        });
    }

    static sendErrorResponse(res, result, message) {
        res.status(500).send({
            data: result,
            msg: message,
            status: 500
        });
    }

    static sendErrorResponseWithCode(res, code, result, message) {
        res.status(code).send({
            data: result,
            msg: message,
            status: code
        });
    }
}

module.exports = ResponseUtil;