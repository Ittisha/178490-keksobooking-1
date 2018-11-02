const AbstractCommand = require(`./abstract-command`);

const generateEntity = require(`../generate/generate-entity`);
const store = require(`../server/store/store`);

const {ERROR_CODE,
  SUCCESS_CODE} = require(`../utils/util-constants`);

class Fill extends AbstractCommand {
  execute(quantity = 10) {
    const offersNumber = Number(quantity);

    if (!offersNumber || !Number.isInteger(offersNumber)) {
      console.error(`Offers number should be an integer`);
      process.exit(ERROR_CODE);
    }

    console.log(`Creating data...`);
    const offers = Array(offersNumber).fill(null).map(() => generateEntity());

    console.log(`Connecting to database...`);

    store.saveMany(offers)
    .then(() => {
      console.log(`Database was successfully filled with ${offersNumber} offers`);
      process.exit(SUCCESS_CODE);
    })
    .catch((err) => {
      console.error(err);
      process.exit(ERROR_CODE);
    });
  }
}

module.exports = new Fill(`fill`, `Fills database with mock data`);
