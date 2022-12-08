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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricalMarketData = void 0;
const nightmare_1 = __importDefault(require("nightmare"));
const DATE_REGX = /^([0-9]{4}-[0-9]{2}-[0-9]{2})([A-Z]+([0-9]{2}:[0-9]{2}:[0-9]{2}).([0-9+-:]+))*$/g;
const BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/:symbol:";
let nightmare;
function scrapeHistoricalMarketData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        nightmare =
            nightmare instanceof nightmare_1.default ? nightmare : new nightmare_1.default({ show: false });
        try {
            const data = yield nightmare
                .goto(url)
                .wait("body")
                .evaluate(() => {
                return JSON.stringify(document === null || document === void 0 ? void 0 : document.querySelector("body").innerText);
            });
            return JSON.parse(data);
        }
        catch (error) {
            return { error };
        }
    });
}
/**
 * Get historical intraday and end-of-day data for all US stocks,
 * optionally including pre and post market data.
 *
 * @param IHistoricalMarketDataQueryProps queryParams Query parameters
 * @returns Promise<IHistoricalMarketData> | Error
 */
const getHistoricalMarketData = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(['query: ', queryParams]);
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    const now = Date.now();
    const params = {
        symbol: queryParams.symbol,
        interval: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.interval) || "1d",
        useYfid: "true",
        includePrePost: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.includePrePost)
            ? String(queryParams === null || queryParams === void 0 ? void 0 : queryParams.includePrePost)
            : "true",
        events: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.events) || "div|split|earn",
        lang: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.lang) || "en-US",
        region: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.region) || "US",
        crumb: "Qb/5GAR93Rf",
        corsDomain: "finance.yahoo.com",
    };
    if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.startDate) {
        const startDate = DATE_REGX.test(queryParams === null || queryParams === void 0 ? void 0 : queryParams.startDate)
            ? queryParams.startDate
            : parseInt(queryParams.startDate);
        if (typeof startDate === "string") {
            params.period1 = String(parseInt(String(Number(new Date(startDate)) / 1000)) // - 46213518
            ); // 6mo
        }
        else if (typeof startDate === "number") {
            if (startDate < 10000000000) {
                params.period1 = String(startDate / 1000); // 6mo 46213518
            }
            else if (startDate >= 10000000000 && startDate < 10000000000000) {
                params.period1 = String(parseInt(String(startDate / 1000))); // 6mo 46213518
            }
        }
    }
    if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.endDate) {
        const endDate = DATE_REGX.test(queryParams === null || queryParams === void 0 ? void 0 : queryParams.endDate)
            ? queryParams.endDate
            : parseInt(queryParams.endDate);
        console.log(endDate.toString());
        if (typeof endDate === "string") {
            params.period2 = String(parseInt(String(Number(new Date(endDate)) / 1000)));
        }
        else if (typeof endDate === "number") {
            if (endDate < 10000000000) {
                params.period2 = String(endDate);
            }
            else if (endDate >= 10000000000 && endDate < 10000000000000) {
                params.period2 = String(parseInt(String(endDate / 1000)));
            }
        }
    }
    if (!(params === null || params === void 0 ? void 0 : params.period1) && !(params === null || params === void 0 ? void 0 : params.period2)) {
        params.range = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.dateRange) || "6mo";
    }
    const urlSearchParams = new URLSearchParams(params);
    const url = new URL(`${BASE_URL.replace(":symbol:", params.symbol)}?${urlSearchParams.toString()}`);
    const apiResp = JSON.parse(yield scrapeHistoricalMarketData(url.href));
    if (((_a = apiResp === null || apiResp === void 0 ? void 0 : apiResp.chart) === null || _a === void 0 ? void 0 : _a.error) && !((_b = apiResp === null || apiResp === void 0 ? void 0 : apiResp.chart) === null || _b === void 0 ? void 0 : _b.result)) {
        return { error: (_c = apiResp === null || apiResp === void 0 ? void 0 : apiResp.chart) === null || _c === void 0 ? void 0 : _c.error };
    }
    const apiRespData = (_e = (_d = apiResp === null || apiResp === void 0 ? void 0 : apiResp.chart) === null || _d === void 0 ? void 0 : _d.result) === null || _e === void 0 ? void 0 : _e[0];
    const historicalMarketData = {};
    if (params.interval) {
        historicalMarketData.interval = params.interval;
    }
    if (apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) {
        Object.assign(historicalMarketData, apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta);
        historicalMarketData.firstTradeDate =
            ((_f = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _f === void 0 ? void 0 : _f.firstTradeDate) * 10000;
        historicalMarketData.regularMarketTime =
            ((_g = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _g === void 0 ? void 0 : _g.regularMarketTime) * 1000;
        if ((_k = (_j = (_h = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _h === void 0 ? void 0 : _h.currentTradingPeriod) === null || _j === void 0 ? void 0 : _j.pre) === null || _k === void 0 ? void 0 : _k.start) {
            historicalMarketData.currentTradingPeriod.pre.start =
                apiRespData.meta.currentTradingPeriod.pre.start * 1000;
        }
        if ((_o = (_m = (_l = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _l === void 0 ? void 0 : _l.currentTradingPeriod) === null || _m === void 0 ? void 0 : _m.pre) === null || _o === void 0 ? void 0 : _o.end) {
            historicalMarketData.currentTradingPeriod.pre.end =
                apiRespData.meta.currentTradingPeriod.pre.end * 1000;
        }
        if ((_r = (_q = (_p = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _p === void 0 ? void 0 : _p.currentTradingPeriod) === null || _q === void 0 ? void 0 : _q.post) === null || _r === void 0 ? void 0 : _r.start) {
            historicalMarketData.currentTradingPeriod.post.start =
                apiRespData.meta.currentTradingPeriod.post.start * 1000;
        }
        if ((_u = (_t = (_s = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _s === void 0 ? void 0 : _s.currentTradingPeriod) === null || _t === void 0 ? void 0 : _t.post) === null || _u === void 0 ? void 0 : _u.end) {
            historicalMarketData.currentTradingPeriod.post.end =
                apiRespData.meta.currentTradingPeriod.post.end * 1000;
        }
        if ((_x = (_w = (_v = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _v === void 0 ? void 0 : _v.currentTradingPeriod) === null || _w === void 0 ? void 0 : _w.regular) === null || _x === void 0 ? void 0 : _x.start) {
            historicalMarketData.currentTradingPeriod.regular.start =
                apiRespData.meta.currentTradingPeriod.regular.start * 1000;
        }
        if ((_0 = (_z = (_y = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.meta) === null || _y === void 0 ? void 0 : _y.currentTradingPeriod) === null || _z === void 0 ? void 0 : _z.regular) === null || _0 === void 0 ? void 0 : _0.end) {
            historicalMarketData.currentTradingPeriod.regular.end =
                apiRespData.meta.currentTradingPeriod.regular.end * 1000;
        }
    }
    const quote = (_2 = (_1 = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.indicators) === null || _1 === void 0 ? void 0 : _1.quote) === null || _2 === void 0 ? void 0 : _2[0];
    const timestamps = apiRespData === null || apiRespData === void 0 ? void 0 : apiRespData.timestamp;
    if (quote && (timestamps === null || timestamps === void 0 ? void 0 : timestamps.length)) {
        historicalMarketData.items = timestamps.reduce((arr, item, i) => {
            var _a, _b, _c, _d, _e;
            arr.push({
                open: (_a = quote.open) === null || _a === void 0 ? void 0 : _a[i],
                low: (_b = quote.low) === null || _b === void 0 ? void 0 : _b[i],
                high: (_c = quote.high) === null || _c === void 0 ? void 0 : _c[i],
                close: (_d = quote.close) === null || _d === void 0 ? void 0 : _d[i],
                volume: (_e = quote.volume) === null || _e === void 0 ? void 0 : _e[i],
                datetime: item * 1000,
            });
            return arr;
        }, []);
    }
    console.log(['response: ', historicalMarketData]);
    return historicalMarketData;
});
exports.getHistoricalMarketData = getHistoricalMarketData;
exports.default = exports.getHistoricalMarketData;
