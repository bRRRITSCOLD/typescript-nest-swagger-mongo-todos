/* node_modules */
import * as colors from 'colors';

const LEVELS: any = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

const _color = (level: string, str: string) => {
  try {
    let result: string;

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
  } catch (err) {
    throw err;
  }
};

const BaseLoggingContext = (env: string, date: string, level: string, message: string, color: boolean = false) => {
  try {
    const levelContextLength = 5;
    
    let _level: string;
  
    if (level.length < levelContextLength) {
      const needed: number = levelContextLength - level.length;
      const padding = ' '.repeat(needed);
      _level = `${padding}${level.toUpperCase()}`;
    } else {
      _level = `${level.toUpperCase()}`; 
    }
  
    let baseLoggingContext: string;

    if (color) {
      baseLoggingContext = `[${date}] - ${env} - ${_color(level, _level)} - ${_color(level, message)}`;
    } else {
      baseLoggingContext = `[${date}] - ${env} - ${_level} - ${message}`;
    }

    return baseLoggingContext;
  } catch (err) {
    throw err;
  }
};

export default class Logger {
  private colorsEnabled: boolean;

  constructor(opts: { colors?: boolean }) {
    this.colorsEnabled = opts.colors;
  }

  public trace(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.TRACE,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }

  public debug(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.DEBUG,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }

  info(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.INFO,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }

  public warn(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.WARN,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }

  public error(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.ERROR,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }

  public fatal(str: string) {
    try {
      const message: string = BaseLoggingContext(
        process.env.NODE_ENV ? process.env.NODE_ENV : 'NA',
        new Date().toISOString(),
        LEVELS.FATAL,
        str,
        this.colorsEnabled
      );

      console.log(message);

      return;
    } catch (err) {
      console.log(`${JSON.stringify({ message: err.message, stack: err.stack })}`);
      return false;
    }
  }
}