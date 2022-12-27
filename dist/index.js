"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const app_1 = require("./app");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
const PORT = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) ? parseInt(process.env.PORT) : 3000;
(0, app_1.init)().listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
