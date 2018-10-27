const {StatusCodes} = require(`../server-settings`);

module.exports = class ValidationError extends Error {
  constructor(errors) {
    super(`Data validation error`);
    this.errors = errors;
    this.code = StatusCodes.BAD_REQUEST;
  }
};
