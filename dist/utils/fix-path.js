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
exports.shellPathSync = exports.shellPath = exports.shellEnvSync = exports.shellEnv = exports.defaultShell = exports.detectDefaultShell = void 0;
const node_process_1 = __importDefault(require("node:process"));
// import {shellPathSync} from 'shell-path';
// import {shellEnv, shellEnvSync} from 'shell-env';
// import process from 'node:process';
const execa_1 = __importDefault(require("execa"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
// import defaultShell from 'default-shell';
const node_os_1 = require("node:os");
const detectDefaultShell = () => {
    const { env } = node_process_1.default;
    if (node_process_1.default.platform === 'win32') {
        return env.COMSPEC || 'cmd.exe';
    }
    try {
        const { shell } = (0, node_os_1.userInfo)();
        if (shell) {
            return shell;
        }
    }
    catch (_a) { }
    if (node_process_1.default.platform === 'darwin') {
        return env.SHELL || '/bin/zsh';
    }
    return env.SHELL || '/bin/sh';
};
exports.detectDefaultShell = detectDefaultShell;
// Stores default shell when imported.
exports.defaultShell = (0, exports.detectDefaultShell)();
const args = [
    '-ilc',
    'echo -n "_SHELL_ENV_DELIMITER_"; env; echo -n "_SHELL_ENV_DELIMITER_"; exit',
];
const env = {
    // Disables Oh My Zsh auto-update thing that can block the process.
    DISABLE_AUTO_UPDATE: 'true',
};
const parseEnv = (env) => {
    env = env.split('_SHELL_ENV_DELIMITER_')[1];
    const returnValue = {};
    for (const line of (0, strip_ansi_1.default)(env).split('\n').filter(line => Boolean(line))) {
        const [key, ...values] = line.split('=');
        returnValue[key] = values.join('=');
    }
    return returnValue;
};
function shellEnv(shell) {
    return __awaiter(this, void 0, void 0, function* () {
        if (node_process_1.default.platform === 'win32') {
            return node_process_1.default.env;
        }
        try {
            const { stdout } = yield (0, execa_1.default)(shell || exports.defaultShell, args, { env });
            return parseEnv(stdout);
        }
        catch (error) {
            if (shell) {
                throw error;
            }
            else {
                return node_process_1.default.env;
            }
        }
    });
}
exports.shellEnv = shellEnv;
function shellEnvSync(shell) {
    if (node_process_1.default.platform === 'win32') {
        return node_process_1.default.env;
    }
    try {
        const { stdout } = execa_1.default.sync(shell || exports.defaultShell, args, { env });
        return parseEnv(stdout);
    }
    catch (error) {
        if (shell) {
            throw error;
        }
        else {
            return node_process_1.default.env;
        }
    }
}
exports.shellEnvSync = shellEnvSync;
function shellPath() {
    return __awaiter(this, void 0, void 0, function* () {
        const { PATH } = yield shellEnv();
        return PATH;
    });
}
exports.shellPath = shellPath;
function shellPathSync() {
    const { PATH } = shellEnvSync();
    return PATH;
}
exports.shellPathSync = shellPathSync;
function fixPath() {
    if (node_process_1.default.platform === 'win32') {
        return;
    }
    node_process_1.default.env.PATH = shellPathSync() || [
        './node_modules/.bin',
        '/.nodebrew/current/bin',
        '/usr/local/bin',
        node_process_1.default.env.PATH,
    ].join(':');
}
exports.default = fixPath;
