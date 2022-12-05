"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : null,
    });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
