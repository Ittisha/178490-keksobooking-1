const generateEntity = require(`./generate-entity`);

module.exports = Array(50).fill(null).map(() => generateEntity());
