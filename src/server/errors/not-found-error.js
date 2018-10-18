const {StatusCodes} = require(`../server-settings`);

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = StatusCodes.NOT_FOUND;
  }
};
