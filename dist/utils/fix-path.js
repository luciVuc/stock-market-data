"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellPathSync = exports.shellEnvSync = exports.defaultShell = exports.detectDefaultShell = void 0;
const node_process_1 = __importDefault(require("node:process"));
const execa_1 = __importDefault(require("execa"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
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
// export async function shellEnv(shell?: string) {
// 	if (process.platform === 'win32') {
// 		return process.env;
// 	}
// 	try {
// 		const {stdout} = await execa(shell || defaultShell, args, {env});
// 		return parseEnv(stdout);
// 	} catch (error) {
// 		if (shell) {
// 			throw error;
// 		} else {
// 			return process.env;
// 		}
// 	}
// }
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
// export async function shellPath() {
// 	const {PATH} = await shellEnv();
// 	return PATH;
// }
function shellPathSync() {
    const { PATH } = shellEnvSync();
    return PATH;
}
exports.shellPathSync = shellPathSync;
function fixPath() {
    if (node_process_1.default.platform === 'win32') {
        return;
    }
    node_process_1.default.env.PATH = // shellPathSync() || 
        [
            './node_modules/.bin',
            '/.nodebrew/current/bin',
            '/usr/local/bin',
            node_process_1.default.env.PATH,
        ].join(':');
}
exports.default = fixPath;
