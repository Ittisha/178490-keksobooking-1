module.exports.DEFAULT_MIME_TYPE = `text/plain`;
module.exports.ERROR_ADDRESS_IN_USE = `EADDRINUSE`;
module.exports.SERVER_PORT = 3000;
module.exports.SERVER_HOST = `127.0.0.1`;
module.exports.StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
module.exports.OFFERS_SKIP = 0;
module.exports.OFFERS_LIMIT = 20;

const TitleLength = {
  MIN: 30,
  MAX: 140
};
module.exports.TitleLength = TitleLength;

const Price = {
  MIN: 1,
  MAX: 100000
};
module.exports.Price = Price;

const OFFER_TYPES = [`flat`, `house`, `bungalo`, `palace`];
module.exports.OFFER_TYPES = OFFER_TYPES;

const MAX_ADDRESS_LENGTH = 100;
module.exports.MAX_ADDRESS_LENGTH = MAX_ADDRESS_LENGTH;

const RoomsQuantity = {
  MIN: 0,
  MAX: 1000
};
module.exports.RoomsQuantity = RoomsQuantity;

module.exports.NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
module.exports.OFFER_FEATURES = OFFER_FEATURES;

module.exports.CHECK_IN_OUT_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

module.exports.ValidateErrorMessage = {
  REQUIRED: `is required`,
  TITLE: `should be a string with a length from ${TitleLength.MIN} to ${TitleLength.MAX} characters`,
  TYPE: `should be one of the following types: ${OFFER_TYPES.join(`, `)}`,
  PRICE: `should be a number between ${Price.MIN} and ${Price.MAX}`,
  ADDRESS: `should be a string with a length not more than ${MAX_ADDRESS_LENGTH} characters`,
  CHECKIN: `should be a string in HH:mm format`,
  CHECKOUT: `should be a string in HH:mm format`,
  ROOMS: `should be a number between ${RoomsQuantity.MIN} and ${RoomsQuantity.MAX}`,
  FEATURES: `should be one of the following types: ${OFFER_FEATURES.join(`, `)}`,
  IMAGES: `should be an image type: image/jpg, image/png ...`
};

module.exports.FormFields = {
  rooms: `rooms`,
  title: `title`,
  type: `type`,
  price: `price`,
  address: `address`,
  checkin: `checkin`,
  checkout: `chekout`,
  features: `features`,
  avatar: `avatar`,
  preview: `preview`
};
