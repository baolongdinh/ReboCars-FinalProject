const httpStatusCodes = require('./httpStatusCode')


class  ErrorResponse extends Error { 
    constructor(message, status) { 
        super(message)
        this.status = status
    }
}

class BadRequestError extends ErrorResponse { 
    constructor (message = httpStatusCodes.ReasonPhrases.BAD_REQUEST, statusCode = httpStatusCodes.StatusCodes.BAD_REQUEST) { 
        super(message,statusCode)
    }
}

class UnAuthorizedError extends ErrorResponse { 
    constructor (message = httpStatusCodes.ReasonPhrases.UNAUTHORIZED, statusCode = httpStatusCodes.StatusCodes.UNAUTHORIZED) { 
        super(message,statusCode)
    }
}

class ForbiddenError extends ErrorResponse { 
    constructor (message = httpStatusCodes.ReasonPhrases.FORBIDDEN, statusCode = httpStatusCodes.StatusCodes.FORBIDDEN) { 
        super(message,statusCode)
    }
}

class NotfoundError extends ErrorResponse { 
    constructor (message = httpStatusCodes.ReasonPhrases.NOT_FOUND, statusCode = httpStatusCodes.StatusCodes.NOT_FOUND) { 
        super(message,statusCode)
    }
}




module.exports = { 
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError
}