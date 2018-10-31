const Cursor = require(`./cursor-mock`);
const offers = require(`../generate/offers`);

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
      insertedId: 42
    };
  }
}
module.exports = new OffersStoreMock(offers);
