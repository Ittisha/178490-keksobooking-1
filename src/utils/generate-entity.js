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
  TIME_INTERVAL} = require(`./util-constants`);

const locationX = getRandomInteger(CoordinateX.min, CoordinateX.max);

const locationY = getRandomInteger(CoordinateY.min, CoordinateY.max);

const generateEntity = () => {
  return {
    'author': {
      'avatar': `https://robohash.org/${getRandomString()}`,
    },
    'offer': {
      'title': getRandomArrayItem(OFFER_TITLES),
      'address': `${locationX}, ${locationY}`,
      'price': getRandomInteger(PriceInterval.min, PriceInterval.max),
      'type': getRandomArrayItem(BUNGALO_TYPES),
      'rooms': getRandomInteger(RoomsNumber.min, RoomsNumber.max),
      'guests': getRandomInteger(GuestsNumber.min, GuestsNumber.max),
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
