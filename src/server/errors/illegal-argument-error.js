const {StatusCodes} = require(`../server-settings`);

module.exports = class IllegalArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = StatusCodes.BAD_REQUEST;
  }
};
