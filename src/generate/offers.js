const generateEntity = require(`./generate-entity`);

const ENTITIES_QUANTITY = 25;

module.exports = Array(ENTITIES_QUANTITY).fill(null).map(() => generateEntity());
