const AbstractCommand = require(`./abstract-command`);

const {Commands} = require(`../utils/util-constants`);
const generateEntity = require(`../generate/generate-entity`);
const logger = require(`../server/logger`);
const store = require(`../server/store/store`);

const {ERROR_CODE} = require(`../utils/util-constants`);

class Fill extends AbstractCommand {
  async execute(quantity = 10) {
    const offersNumber = Number(quantity);

    if (!offersNumber || !Number.isInteger(offersNumber)) {
      console.error(`Offers number should be an integer`);
      process.exit(ERROR_CODE);
    }

    console.log(`Creating data...`);
    const offers = Array(offersNumber).fill(null).map(() => generateEntity());

    console.log(`Connecting to database...`);

    await store.saveMany(offers)
    .then(() => {
      console.log(`Database was successfully filled with ${offersNumber} offers`);
    })
    .catch((err) => {
      logger.error(err);
      process.exit(ERROR_CODE);
    });
  }
}

module.exports = new Fill(Commands.fill, `Fills database with mock data`);
