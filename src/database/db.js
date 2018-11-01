const {MongoClient} = require(`mongodb`);
const {ERROR_CODE} = require(`../utils/util-constants`);

const {DB_HOST = `localhost:27017`, DB_PATH = `keksobooking`} = process.env;

module.exports = MongoClient.connect(`mongodb://${DB_HOST}`, {useNewUrlParser: true})
.then((client) => client.db(DB_PATH)).catch((err) => {
  console.error(`Failed to connect to ${DB_PATH} database`, err);
  process.exit(ERROR_CODE);
});
