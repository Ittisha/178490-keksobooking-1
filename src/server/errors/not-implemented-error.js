const {StatusCodes} = require(`../server-settings`);

class NotImplementedError extends Error {
  constructor(message) {
    super(message);

    this.code = StatusCodes.NOT_IMPLEMENTED_ERROR;
    this.error = `This API is not implemented`;
    this.errorMessage = message;
  }
}

module.exports = NotImplementedError;
