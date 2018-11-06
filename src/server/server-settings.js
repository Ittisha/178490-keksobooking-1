module.exports.CHECK_IN_OUT_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
module.exports.DEFAULT_PATH = `/api/offers`;
module.exports.DEFAULT_SERVER_PORT = 3000;
module.exports.DEFAULT_SERVER_HOST = `localhost`;
module.exports.ERROR_ADDRESS_IN_USE = `EADDRINUSE`;
module.exports.FormFields = {
  address: `address`,
  author: `author`,
  avatar: `avatar`,
  checkin: `checkin`,
  checkout: `checkout`,
  features: `features`,
  guests: `guests`,
  rooms: `rooms`,
  preview: `preview`,
  price: `price`,
  title: `title`,
  type: `type`,
};

module.exports.ImagesStoreNames = {
  AVATARS: `avatars`,
  PREVIEWS: `previews`
};

module.exports.ImplementedMethods = {
  GET: `GET`,
  POST: `POST`
};

const MAX_ADDRESS_LENGTH = 100;
module.exports.MAX_ADDRESS_LENGTH = MAX_ADDRESS_LENGTH;

module.exports.NAMES = [
  `Keks`,
  `Pavel`,
  `Nikolay`,
  `Alex`,
  `Ulyana`,
  `Anastasyia`,
  `Julia`
];

const OFFER_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
module.exports.OFFER_FEATURES = OFFER_FEATURES;

const OFFER_TYPES = [
  `flat`,
  `house`,
  `bungalo`,
  `palace`
];

module.exports.OFFER_TYPES = OFFER_TYPES;

module.exports.OFFERS_LIMIT = 20;
module.exports.OFFERS_SKIP = 0;

const Price = {
  MIN: 1,
  MAX: 100000
};
module.exports.Price = Price;

const RoomsQuantity = {
  MIN: 0,
  MAX: 1000
};
module.exports.RoomsQuantity = RoomsQuantity;

module.exports.StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED_ERROR: 501
};

const TitleLength = {
  MIN: 30,
  MAX: 140
};
module.exports.TitleLength = TitleLength;

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
