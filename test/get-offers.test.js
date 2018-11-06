const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const offers = require(`../src/generate/offers`);
const offersStoreMock = require(`./mock/offers-store-mock`);
const MockImageStore = require(`./mock/images-store-mock`);
const {DEFAULT_PATH,
  ImagesStoreNames,
  OFFERS_LIMIT,
  StatusCodes} = require(`./../src/server/server-settings`);

const offersRoute = require(`../src/server/routes/router`)(
    offersStoreMock,
    new MockImageStore(ImagesStoreNames.AVATARS),
    new MockImageStore(ImagesStoreNames.PREVIEWS)
);

const app = express();
app.use(DEFAULT_PATH, offersRoute);
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`Page was not found`);
});

describe(`GET ${DEFAULT_PATH}`, () => {
  it(`get all ${OFFERS_LIMIT} offers and additional propeties as json`, async () => {
    const response = await request(app)
    .get(DEFAULT_PATH)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    const requestedData = response.body;

    assert.strictEqual(requestedData.total, offers.length);
  });

  it(`get all ${OFFERS_LIMIT} offers as html`, async () => {
    return await request(app)
    .get(DEFAULT_PATH)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /html/);
  });

  it(`get all offers with / at the end`, async () => {
    const response = await request(app)
    .get(`${DEFAULT_PATH}/`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    const requestedData = response.body;

    assert.strictEqual(requestedData.total, offers.length);
  });

  it(`get all offers with / at the end as html`, async () => {
    return await request(app)
    .get(`${DEFAULT_PATH}/`)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /html/);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app)
    .get(`/api/something-unknown`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.NOT_FOUND)
    .expect(`Page was not found`)
    .expect(`Content-Type`, /html/);
  });

  it(`get offers with limit param as json`, async () => {
    const LIMIT_PARAM = 5;
    const response = await request(app)
    .get(`${DEFAULT_PATH}?limit=${LIMIT_PARAM}`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    const requestedData = response.body;
    assert.strictEqual(requestedData.data.length, LIMIT_PARAM);
    assert.strictEqual(requestedData.data[LIMIT_PARAM - 1].date, offers[LIMIT_PARAM - 1].date);
  });

  it(`get offers with limit param as html`, async () => {
    const LIMIT_PARAM = 5;
    const response = await request(app)
    .get(`${DEFAULT_PATH}?limit=${LIMIT_PARAM}`)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /html/);

    const offersNumber = response.text.match(/<article>/g).length;
    assert.strictEqual(offersNumber, LIMIT_PARAM);
  });

  it(`get offers with skip param as json`, async () => {
    const SKIP_PARAM = 7;
    const response = await request(app)
    .get(`${DEFAULT_PATH}?skip=${SKIP_PARAM}`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    const requestedData = response.body;
    const expectedData = offers.slice(SKIP_PARAM, SKIP_PARAM + OFFERS_LIMIT);

    assert.deepStrictEqual(requestedData.data, expectedData);
    assert.strictEqual(requestedData.data.length, expectedData.length);
  });

  it(`get offers with skip param as html`, async () => {
    const SKIP_PARAM = 7;
    const response = await request(app)
    .get(`${DEFAULT_PATH}?skip=${SKIP_PARAM}`)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /html/);

    const requestedOffersNumber = response.text.match(/<article>/g).length;
    const expectedData = offers.slice(SKIP_PARAM, SKIP_PARAM + OFFERS_LIMIT);

    assert.strictEqual(requestedOffersNumber, expectedData.length);
  });
});

describe(`GET ${DEFAULT_PATH}/:date`, () => {
  it(`get offer with correct date as json`, async () => {
    const OFFER_INDEX = 0;
    const offer = offers[OFFER_INDEX];

    const response = await request(app)
    .get(`${DEFAULT_PATH}/${offer.date}`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /json/);

    const requestedOffer = response.body;

    assert.strictEqual(requestedOffer.date, offer.date);
  });

  it(`get offer with correct date accepting text/html`, async () => {
    const OFFER_INDEX = 0;
    const offer = offers[OFFER_INDEX];

    return await request(app)
    .get(`${DEFAULT_PATH}/${offer.date}`)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.OK)
    .expect(`Content-Type`, /html/);
  });

  it(`get offer with incorrect date accepting "application/json"`, async () => {
    const NINE_DAYS = 1000 * 60 * 60 * 24 * 9;

    return await request(app)
    .get(`${DEFAULT_PATH}/${Date.now() - NINE_DAYS}`)
    .set(`Accept`, `application/json`)
    .expect(StatusCodes.NOT_FOUND)
    .expect(`Content-Type`, /json/);
  });

  it(`get offer with incorrect date accepting "text/html"`, async () => {
    const NINE_DAYS = 1000 * 60 * 60 * 24 * 9;

    return await request(app)
    .get(`${DEFAULT_PATH}/${Date.now() - NINE_DAYS}`)
    .set(`Accept`, `text/html`)
    .expect(StatusCodes.NOT_FOUND)
    .expect(`Content-Type`, /html/);
  });
});
