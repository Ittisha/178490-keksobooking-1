const {RANDOM_STRING_RADIX, BEGIN_SLICE_INDEX} = require(`./util-constants`);

/**
 * Returns random integer between min and max inclusive
 * @param {nunber} min
 * @param {number} max
 * @return {number}
 */
const getRandomInteger = (min, max) => Math.floor(Math.random() *
  (max + 1 - min) + min);

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

module.exports.getRandomInteger = getRandomInteger;

module.exports.getRandomString = () => Math.random().toString(RANDOM_STRING_RADIX).slice(BEGIN_SLICE_INDEX);

module.exports.getRandomArrayItem = getRandomArrayItem;

module.exports.getUniqueArray = (array) => {
  const newFeatures = [];
  newFeatures.length = getRandomInteger(1, array.length);

  const featuresSet = new Set(newFeatures.fill().map(() => getRandomArrayItem(array)));

  return Array.from(featuresSet);
};

module.exports.shuffleArray = (array) => {
  return array.sort(() => {
    return 0.5 - Math.random();
  });
};

module.exports.getDate = (timeInterval) => {
  const dateNow = Date.now();

  return getRandomInteger(dateNow, dateNow - timeInterval);
};
