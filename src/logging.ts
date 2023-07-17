import { settings } from "./config";


export const enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL",
}

export class Logger {

    constructor(
        readonly name: string
    ) {
        this.name = name
    }

    debug(handle: string, input: any = null, output: any = null, message: string = "") {
        this.log(LogLevel.DEBUG, handle, input, output, message);
    }

    info(handle: string, input: any = null, output: any = null, message: string = "") {
        this.log(LogLevel.INFO, handle, input, output, message);
    }

    warn(handle: string, input: any = null, output: any = null, message: string = "") {
        this.log(LogLevel.WARN, handle, input, output, message);
    }

    error(handle: string, input: any = null, output: any = null, message: string = "") {
        this.log(LogLevel.ERROR, handle, input, output, message);
    }

    fatal(handle: string, input: any = null, output: any = null, message: string = "") {
        this.log(LogLevel.FATAL, handle, input, output, message);
    }

    log(
        level: LogLevel, handle: string, input: any = null, output: any = null, message: string = ""
    ) {
        console.log(
            '%s %s [%s][%s][{"input":%s,"output":%s}]%s',
            new Date(), level, settings.SERVER_NAME, handle, input, output, message
        );
    }
}

export const logger = new Logger(settings.SERVER_NAME);
