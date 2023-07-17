export class HttpError extends Error {
    constructor(
        readonly status: number,
        message: string,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

// throw this when needs fatal log
export class FatalError extends HttpError {
}
