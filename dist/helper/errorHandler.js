"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HTTPError_1 = require("./HTTPError");
function errorHandler(error, req, res, next) {
    console.log(error);
    if (error instanceof HTTPError_1.HTTPError) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }
    return res.status(500).json({
        status: 500,
        message: "Internal server error",
    });
}
exports.errorHandler = errorHandler;
