"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const LEVELS = {
    TRACE: 'TRACE',
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    FATAL: 'FATAL'
};
const _color = (level, str) => {
    try {
        let result;
        switch (level.toUpperCase()) {
            case LEVELS.DEBUG: {
                result = colors.yellow(str);
                break;
            }
            case LEVELS.INFO: {
                result = colors.green(str);
                break;
            }
            case LEVELS.WARN: {
                result = colors.magenta(str);
                break;
            }
            case LEVELS.ERROR: {
                result = colors.red(str);
                break;
            }
            case LEVELS.FATAL: {
                result = colors.cyan(str);
                break;
            }
            default: {
                result = str;
                break;
            }
        }
        return result;
    }
    catch (err) {
        throw err;
    }
};
const BaseLoggingContext = (env, date, level, message, color = false) => {
    try {
        const envContextLength = 5;
        const dateContextLength = 24;
        const levelContextLength = 5;
        let _env;
        if (env.length < envContextLength) {
            const needed = envContextLength - env.length;
            const padding = ' '.repeat(needed);
            _env = `${padding}${env.toUpperCase()}`;
        }
        else {
            _env = `${env.toUpperCase()}`;
        }
        let _date;
        if (date.length < dateContextLength) {
            const needed = dateContextLength - date.length;
            const padding = ' '.repeat(needed);
            _date = `${padding}${date}`;
        }
        else {
            _date = `${date}`;
        }
        let _level;
        if (level.length < levelContextLength) {
            const needed = levelContextLength - level.length;
            const padding = ' '.repeat(needed);
            _level = `${padding}${level.toUpperCase()}`;
        }
        else {
            _level = `${level.toUpperCase()}`;
        }
        let baseLoggingContext;
        if (color) {
            baseLoggingContext = `[${_color(level, _date)}] - ${_color(level, _env)} - ${_color(level, _level)} - ${_color(level, message)}`;
        }
        else {
            baseLoggingContext = `[${_date}] - ${_env} - ${_level} - ${message}`;
        }
        return baseLoggingContext;
    }
    catch (err) {
        throw err;
    }
};
class Logger {
    constructor(opts) {
        this.colorsEnabled = opts.colors;
    }
    trace(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.TRACE, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
    debug(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.DEBUG, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
    info(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.INFO, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
    warn(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.WARN, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
    error(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.ERROR, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
    fatal(str) {
        try {
            const message = BaseLoggingContext(process.env.NODE_ENV ? process.env.NODE_ENV : 'NA', new Date().toISOString(), LEVELS.FATAL, str, this.colorsEnabled);
            console.log(message);
            return;
        }
        catch (err) {
            console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
            return false;
        }
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map