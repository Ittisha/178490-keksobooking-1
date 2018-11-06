const {RANDOM_STRING_RADIX,
  BEGIN_SLICE_INDEX} = require(`./util-constants`);

module.exports.asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports.doesAcceptHtml = (req) => req.accepts([`json`, `html`]) === `html`;

module.exports.makeArray = (stringOrArray) => {
  if (stringOrArray) {
    return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray];
  }
  return [];
};


module.exports.getDate = (timeInterval) => {
  const dateNow = Date.now();

  return getRandomInteger(dateNow, dateNow - timeInterval);
};

// Returns random integer between min and max inclusive
const getRandomInteger = (min, max) => Math.floor(Math.random() *
  (max + 1 - min) + min);
module.exports.getRandomInteger = getRandomInteger;

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];
module.exports.getRandomArrayItem = getRandomArrayItem;

module.exports.getRandomString = () => Math.random().toString(RANDOM_STRING_RADIX).slice(BEGIN_SLICE_INDEX);

module.exports.getUniqueArray = (array) => {
  const newFeatures = [];
  newFeatures.length = getRandomInteger(1, array.length);

  const featuresSet = new Set(newFeatures.fill().map(() => getRandomArrayItem(array)));

  return Array.from(featuresSet);
};

module.exports.shuffleArray = (array) => {
  const newArray = [...array];
  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
};
