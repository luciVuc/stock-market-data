"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingRoutes = exports.catchAllRoutes = exports.historicalMarketDataRoutes = void 0;
var historicalData_1 = require("./historicalData");
Object.defineProperty(exports, "historicalMarketDataRoutes", { enumerable: true, get: function () { return __importDefault(historicalData_1).default; } });
var catchAll_1 = require("./catchAll");
Object.defineProperty(exports, "catchAllRoutes", { enumerable: true, get: function () { return __importDefault(catchAll_1).default; } });
var ping_1 = require("./ping");
Object.defineProperty(exports, "pingRoutes", { enumerable: true, get: function () { return __importDefault(ping_1).default; } });
