import { NextFunction, Request, RequestHandler, Response } from "express-serve-static-core";
import { Logger, LogLevel } from "../logging";
import { FatalError, HttpError } from "../errors";


interface LogConfig {
    logger: Logger,
    skipPaths: string[],
}


// wrapper that catches error and pass to middleware chain
export const routeHandler = (handler: RequestHandler) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            // Call the route handler and wait for it to complete
            await handler.bind(request)(request, response, next);
        } catch (err) {
            next(err);
        }
    };
};


export function routeLogger(logConfig: LogConfig) {
    const logger = logConfig.logger;
    const skip = getSkipPaths(logConfig.skipPaths);

    return function(request: Request, response: Response, next: NextFunction) {
        // Log only when path is not being skipped
        if (!skip.has(request.path)) {
            const end = response.end;
            response.end = endResponseAndLog(logger, request, response, end);
        }
        next();
    }
}


export function errorHandler(logConfig: LogConfig) {
    const logger = logConfig.logger;
    const skip = getSkipPaths(logConfig.skipPaths);

    return function(error: Error, request: Request, response: Response, next: NextFunction) {
        // Log only when path is not being skipped
        if (!skip.has(request.path)) {
            const end = response.end;
            response.end = endResponseAndLog(logger, request, response, end, error);
        }
        next();

        switch (error.constructor) {
            case FatalError: // fall-through
            case HttpError:
                response.status((error as HttpError).status)
                break;
            default:
                response.status(500)
                break;
        }

        response.json({
            error: error.message
        })
    }
}


function endResponseAndLog(
    logger: Logger,
    request: Request,
    response: Response,
    end: (chunk: any, encoding: BufferEncoding, cb?: () => void) => Response,
    error?: Error
) {
    return function (chunk: any) {
        /**
         * 1. avoid error responses being logged twice in logHandler and error handler
         * 2. routes that calling response with status >= 400 without passing error to next() will not be logged
         *
         * Note:
         * - response status will be set to the correct value in response.end function,
         *      which is handled by express internally
         * */
        if ((error === undefined && response.statusCode < 400) || error !== undefined) {
            const chunks: any[] = [];
            let responseBody: string;
            if (chunk) {
                chunks.push(chunk);
            }
            responseBody = Buffer.concat(chunks).toString('utf8');

            if (!error) {
                logger.info(`${request.method} ${request.originalUrl} ${response.statusCode}`, JSON.stringify(request.body), responseBody, "");
            } else {
                let level: LogLevel;
                switch (error.constructor) {
                    case FatalError:
                        level = LogLevel.FATAL;
                        break;
                    case HttpError:
                        level = LogLevel.WARN;
                        break;
                    default:
                        level = LogLevel.ERROR;
                        break;
                }
                logger.log(level, `${request.method} ${request.originalUrl} ${response.statusCode}`, JSON.stringify(request.body), responseBody, "\n" + error.stack);
            }
        }

        return end.apply(response, arguments as any);
    }
}


function getSkipPaths(paths: string[]): Set<string> {
    const skip = new Set<string>();
    for (const path of paths) {
        skip.add(path);
    }
    return skip;
}
