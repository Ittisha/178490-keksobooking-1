const generateEntity = require(`../../utils/generate-entity`);

module.exports = Array(50).fill(null).map(() => generateEntity());
