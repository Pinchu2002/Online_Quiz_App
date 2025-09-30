class BaseError extends Error {
  constructor(message, statusCode, code, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}

class ValidationError extends BaseError {
  constructor(message = 'Invalid input data', details = []) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class DatabaseError extends BaseError {
  constructor(message = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

class BusinessLogicError extends BaseError {
  constructor(message = 'Business rule violation') {
    super(message, 400, 'BUSINESS_LOGIC_ERROR');
  }
}

module.exports = {
  BaseError,
  ValidationError,
  NotFoundError,
  DatabaseError,
  BusinessLogicError,
};
