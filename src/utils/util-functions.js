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
  const newArray = [...array];
  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
};

module.exports.getDate = (timeInterval) => {
  const dateNow = Date.now();

  return getRandomInteger(dateNow, dateNow - timeInterval);
};
