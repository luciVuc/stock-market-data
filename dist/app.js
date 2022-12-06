"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("colors");
const path_1 = require("path");
const fix_path_1 = __importDefault(require("./utils/fix-path"));
const error_1 = require("./middleware/error");
const routes_1 = require("./routes");
(0, fix_path_1.default)();
// if (process.platform !== 'win32') {
//   process.env.PATH = [
//     './node_modules/.bin',
//     '/.nodebrew/current/bin',
//     '/usr/local/bin',
//     process.env.PATH,
//   ].join(':');
// }
const init = (nodeEnv) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)());
    app.use("/api/data", routes_1.historicalMarketDataRoutes);
    app.use("/api/data", routes_1.pingRoutes);
    app.use("/api/data", routes_1.catchAllRoutes);
    app.use("/api", routes_1.pingRoutes);
    app.use(express_1.default.static((0, path_1.resolve)(__dirname, "..", "static")));
    app.get("/", (request, response) => {
        return response
            .status(200)
            .sendFile((0, path_1.resolve)(__dirname, "..", "static", "index.html"));
    });
    app.use("/", routes_1.pingRoutes);
    app.use(error_1.errorHandler);
    return app;
};
exports.init = init;
exports.default = exports.init;
