class createError extends Error{
    constructor(message, ststusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);

    }
}

module.exports = createError;