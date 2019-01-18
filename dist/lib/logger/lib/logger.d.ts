export default class Logger {
    private colorsEnabled;
    constructor(opts: {
        colors?: boolean;
    });
    trace(str: string): boolean;
    debug(str: string): boolean;
    info(str: string): boolean;
    warn(str: string): boolean;
    error(str: string): boolean;
    fatal(str: string): boolean;
}
