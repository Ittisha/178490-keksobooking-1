const request = require(`supertest`);
const assert = require(`assert`);
const LocalServer = require(`../src/server/local-server`);
const offers = require(`./../src/server/offers/offers`);
const {StatusCodes} = require(`./../src/server/server-settings`);

const testOffer = offers[0];

const localServer = new LocalServer();
localServer.setup();
const app = localServer.app;

describe(`POST /api/offers`, () => {
  it(`sends offer as json`, async () => {
    const response = await request(app)
    .post(`/api/offers`)
    .send(testOffer)
    .set(`Accept`, `application/json`)
    .set(`Content-Type`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    assert.deepStrictEqual(response.body, testOffer);
  });

  it(`sends offer as form-data`, async () => {
    const response = await request(app)
      .post(`/api/offers`)
      .field(`title`, testOffer.offer.title)
      .attach(`avatar`, `${__dirname}/../static/img/avatars/user01.png`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(StatusCodes.OK)
      .expect(`Content-Type`, /json/);

    assert.deepStrictEqual(response.body.title, testOffer.offer.title);
  });
});
