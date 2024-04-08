// Custom error class extending Error
class createError extends Error {
  constructor(message, statusCode) {
    super(message); // Calling the constructor of the Error class

    // Setting custom properties for the error
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Status of the error based on the status code

    // Capturing stack trace for the error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = createError; // Exporting the custom error class
