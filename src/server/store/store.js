const db = require(`../../database/db`);

const logger = require(`../logger`);

const setupCollection = async () => {
  const dBase = await db;
  const collection = dBase.collection(`offers`);

  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OffersStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find({}, {projection: {_id: void 0}});
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OffersStore(setupCollection().catch((err) =>
  logger.error(`Failed to set up "offers"-collection`, err)));
