const {MongoClient} = require(`mongodb`);
const {ERROR_CODE} = require(`../utils/util-constants`);

const URL = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(URL, {useNewUrlParser: true}).then((client) => client.db(`keksobooking`)).catch((err) => {
  console.error(`Failed to connect to MongoDB`, err);
  process.exit(ERROR_CODE);
});
