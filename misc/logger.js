"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationLogger = exports.Log = void 0;
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
class ApplicationLogger {
    constructor() {
        this.filepath = './misc/log.json';
    }
    writeToLog(log) {
        const origin = url_1.default.format({
            protocol: log.origin.protocol,
            host: log.origin.get('host'),
            pathname: log.origin.originalUrl
        });
        const data = {
            origin: origin,
            message: log.message
        };
        fs_1.default.writeFile(this.filepath, JSON.stringify(data), function (err) {
            if (err)
                throw err;
            console.log('complete');
        });
    }
    ;
}
exports.ApplicationLogger = ApplicationLogger;
;
class Log {
    constructor(req, log) {
        this.origin = req;
        this.message = log;
    }
}
exports.Log = Log;
;
