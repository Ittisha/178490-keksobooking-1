module.exports.SUCCESS_CODE = 0;
module.exports.ERROR_CODE = 1;
module.exports.PROGRAM_TITLE = `Keksobooking`;
module.exports.COMMAND_PREFIX_LENGH = 2;
module.exports.PATH_ARGS_LENGTH = 2;
module.exports.MAJOR_RELEASES_INDEX = 0;
module.exports.MINOR_RELEASES_INDEX = 1;
module.exports.PATCH_RELEASES_INDEX = 2;
module.exports.RANDOM_STRING_RADIX = 36;
module.exports.BEGIN_SLICE_INDEX = 2;
module.exports.TIME_INTERVAL = 1000 * 60 * 60 * 24 * 7;
module.exports.URL_HOST = `https://robohash.org/`;

module.exports.EXPECTED_OFFER_PROPERTIES = [`title`, `address`, `price`, `type`, `rooms`, `guests`, `checkin`, `checkout`, `features`, `description`, `photos`];

module.exports.OFFER_TITLES = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];

module.exports.BUNGALO_TYPES = [`flat`, `palace`, `house`, `bungalo`];

module.exports.RoomsNumber = {
  'MIN': 1,
  'MAX': 5,
};

module.exports.PriceInterval = {
  'MIN': 1000,
  'MAX': 1000000,
};

module.exports.GuestsNumber = {
  'MIN': 1,
  'MAX': 15,
};

module.exports.CHECK_IN_OUT_TIMES = [`12:00`, `13:00`, `14:00`];

module.exports.FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

module.exports.PHOTO_URLS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

module.exports.CoordinateX = {
  MIN: 300,
  MAX: 900,
};

module.exports.CoordinateY = {
  MIN: 150,
  MAX: 500,
};

module.exports.UsersBooleanAnswers = {
  YES: `y`,
  NO: `n`
};
