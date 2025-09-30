class ResponseFormatter {
  static success(data) {
    return {
      success: true,
      data,
    };
  }

  static error(code, message, details = []) {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
    };
  }
}

module.exports = ResponseFormatter;
