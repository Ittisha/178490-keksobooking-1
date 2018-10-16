const {getRandomString,
  getRandomInteger,
  getRandomArrayItem,
  getUniqueArray,
  shuffleArray,
  getDate} = require(`./util-functions`);

const {OFFER_TITLES,
  BUNGALO_TYPES,
  RoomsNumber,
  PriceInterval,
  GuestsNumber,
  CHECK_IN_OUT_TIMES,
  FEATURES,
  PHOTO_URLS,
  CoordinateX,
  CoordinateY,
  TIME_INTERVAL,
  URL_HOST} = require(`./util-constants`);

const generateEntity = () => {
  const locationX = getRandomInteger(CoordinateX.MIN, CoordinateX.MAX);

  const locationY = getRandomInteger(CoordinateY.MIN, CoordinateY.MAX);

  return {
    'author': {
      'avatar': URL_HOST + getRandomString(),
    },
    'offer': {
      'title': getRandomArrayItem(OFFER_TITLES),
      'address': `${locationX}, ${locationY}`,
      'price': getRandomInteger(PriceInterval.MIN, PriceInterval.MAX),
      'type': getRandomArrayItem(BUNGALO_TYPES),
      'rooms': getRandomInteger(RoomsNumber.MIN, RoomsNumber.MAX),
      'guests': getRandomInteger(GuestsNumber.MIN, GuestsNumber.MAX),
      'checkin': getRandomArrayItem(CHECK_IN_OUT_TIMES),
      'checkout': getRandomArrayItem(CHECK_IN_OUT_TIMES),
      'features': getUniqueArray(FEATURES),
      'description': ``,
      'photos': shuffleArray(PHOTO_URLS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
    'date': getDate(TIME_INTERVAL),
  };
};

module.exports = generateEntity;
