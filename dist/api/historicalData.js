"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricalMarketData = void 0;
const utils_1 = require("../utils");
const getHistoricalMarketData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const action = "GET_CHART_DATA";
    const symbol = query === null || query === void 0 ? void 0 : query.symbol;
    try {
        if (symbol) {
            const data = yield (0, utils_1.getHistoricalMarketData)(Object.assign(Object.assign({}, query), { symbol: symbol.toUpperCase() }));
            return {
                status: 200,
                action,
                payload: data,
            };
        }
        return {
            status: 400,
            action,
            payload: new Error(`${action}: Invalid symbol`),
        };
    }
    catch (error) {
        return {
            status: 500,
            action,
            payload: new Error(`${action}: ${error.message}`),
        };
    }
});
exports.getHistoricalMarketData = getHistoricalMarketData;
exports.default = exports.getHistoricalMarketData;
