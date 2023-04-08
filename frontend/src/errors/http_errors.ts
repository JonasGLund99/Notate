class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401 (Unauthorized)
 */
export class UnauthorizedError extends HttpError {
}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {
}

// Add more error classes here