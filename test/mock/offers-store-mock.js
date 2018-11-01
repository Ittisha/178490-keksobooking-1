const Cursor = require(`./cursor-mock`);
const offers = require(`../generate/offers`);

const TEST_INSERTED_ID = 42;

class OffersStoreMock {
  constructor(data) {
    this.data = data;
  }
  async getOffer(date) {
    return this.data.find((it) => it.date === date);
  }
  async getAllOffers() {
    return new Cursor(this.data);
  }
  async save() {
    return {
      insertedId: TEST_INSERTED_ID
    };
  }
}
module.exports = new OffersStoreMock(offers);
