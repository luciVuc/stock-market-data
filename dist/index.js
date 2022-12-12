"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const app_1 = require("./app");
const dotenv_1 = require("dotenv");
const os_1 = require("os");
(0, dotenv_1.config)({ path: ".env" });
const PORT = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) ? parseInt(process.env.PORT) : 3000;
(0, app_1.init)().listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    // console.log({
    //     arch: (0, os_1.arch)(),
    //     // cpus: (0, os_1.cpus)(),
    //     platform: (0, os_1.platform)(),
    //     // freemem: (0, os_1.freemem)(),
    //     // homedir: (0, os_1.homedir)(),
    //     // hostname: (0, os_1.hostname)(),
    //     // machine: os_1.machine,
    //     // networkInterfaces: (0, os_1.networkInterfaces)(),
    //     release: (0, os_1.release)(),
    //     // totalmem: (0, os_1.totalmem)(),
    //     type: (0, os_1.type)(),
    //     // userInfo: (0, os_1.userInfo)(),
    //     version: (0, os_1.version)(),
    // });
});
