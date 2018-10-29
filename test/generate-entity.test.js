const assert = require(`assert`);
const generateEntity = require(`./generate/generate-entity`);
const {EXPECTED_OFFER_PROPERTIES,
  OFFER_TITLES,
  BUNGALO_TYPES,
  CHECK_IN_OUT_TIMES,
  FEATURES,
  PHOTO_URLS,
  CoordinateX,
  CoordinateY,
  GuestsNumber,
  PriceInterval,
  RoomsNumber,
  TIME_INTERVAL} = require(`../src/utils/util-constants`);

const entity = generateEntity();

const hasNoRepeatedValues = (array) => {
  return (new Set(array).size === array.length);
};

describe(`Function generatyEntity`, () => {

  describe(`Function generateEntity and its output types`, () => {
    it(`shoul be function`, () => {
      assert.strictEqual(typeof generateEntity, `function`);
    });

    it(`should return object`, () => {
      assert.strictEqual(typeof entity, `object`);
      assert.notStrictEqual(entity, null);
    });
  });

  describe(`The returned object property "author"`, () => {
    it(`should be the property of returned object`, () => {
      const propertyName = `author`;
      assert.ok(entity.hasOwnProperty(propertyName), `There is no ${propertyName} property in returned object`);
    });

    it(`should be an object`, () => {
      assert.strictEqual(typeof entity.author, `object`);
      assert.notStrictEqual(entity.author, null);
    });

    it(`should have "avatar" property`, () => {
      const propertyName = `avatar`;
      assert.ok(entity.author.hasOwnProperty(propertyName), `There is no ${propertyName} property in "author"`);
    });
  });

  describe(`Author.avatar`, () => {
    const avatar = entity.author.avatar;
    const url = `https://robohash.org/`;

    it(`should be a string`, () => {
      assert.strictEqual(typeof avatar, `string`);
    });

    it(`should contains correct url`, () => {
      assert.ok(avatar.indexOf(url) !== -1, `The url is incorrect`);
      assert.strictEqual(avatar.indexOf(url), 0);
    });
  });

  describe(`The returned object property "offer"`, () => {

    it(`should be the property of returned object`, () => {
      const propertyName = `offer`;
      assert.ok(entity.hasOwnProperty(propertyName), `There is no such property in returned object`);
    });

    it(`should be an object`, () => {
      assert.strictEqual(typeof entity.offer, `object`);
      assert.notStrictEqual(entity.offer, null);
    });

    it(`should have OFFER_PROPERTIES`, () => {
      const generatedOfferProperties = Object.keys(entity.offer);

      assert.deepStrictEqual(generatedOfferProperties, EXPECTED_OFFER_PROPERTIES);
    });
  });

  describe(`Offer.title`, () => {
    const title = entity.offer.title;
    const hasExpectedTitle = OFFER_TITLES.some((expectedTitle) => expectedTitle === title);

    it(`should contains a string from OFFER_TITLES`, () => {
      assert.ok(hasExpectedTitle, `There is no such title in the list`);
    });
  });

  describe(`Offer.address`, () => {
    const address = entity.offer.address;

    it(`should be a string "location.x, location y"`, () => {
      const expectedString = `${entity.location.x}, ${entity.location.y}`;

      assert.strictEqual(address, expectedString);
    });
  });

  describe(`Offer.price`, () => {
    const price = entity.offer.price;

    it(`should be a number`, () => {
      assert.strictEqual(typeof price, `number`);
    });

    it(`should be >= ${PriceInterval.MIN}`, () => {
      assert.ok(price >= PriceInterval.MIN, `Price should be equal or over than ${PriceInterval.MIN}`);
    });

    it(`should be <= ${PriceInterval.MAX}`, () => {
      assert.ok(price <= PriceInterval.MAX, `Price should be less or equl to ${PriceInterval.MAX}`);
    });
  });

  describe(`Offer.type`, () => {
    const type = entity.offer.type;
    const hasExpectedType = BUNGALO_TYPES.some((expectedType) => expectedType === type);

    it(`should contains an appropriate type`, () => {
      assert.ok(hasExpectedType, `There is no such bungalo type`);
    });
  });

  describe(`Offer.rooms`, () => {
    const roomsQuantity = entity.offer.rooms;

    it(`should be a number`, () => {
      assert.strictEqual(typeof roomsQuantity, `number`);
    });

    it(`should be >= ${RoomsNumber.MIN}`, () => {
      assert.ok(roomsQuantity >= RoomsNumber.MIN, `Rooms quantity should be equal or more than ${RoomsNumber.MIN}`);
    });

    it(`should be <= ${RoomsNumber.MAX}`, () => {
      assert.ok(roomsQuantity <= RoomsNumber.MAX, `Rooms quantity should be less or equal to ${RoomsNumber.MAX}`);
    });
  });

  describe(`Offer.guests`, () => {
    const guestsQuantity = entity.offer.guests;

    it(`should be a number`, () => {
      assert.strictEqual(typeof guestsQuantity, `number`);
    });

    it(`should be >= ${GuestsNumber.MIN}`, () => {
      assert.ok(guestsQuantity >= GuestsNumber.MIN, `Guests quantity should be equal or more than ${GuestsNumber.MIN}`);
    });
  });

  describe(`Offer.checkin`, () => {
    const checkinTime = entity.offer.checkin;
    const hasExpectedCheckinTime = CHECK_IN_OUT_TIMES.some((expectedCheckinTime) => expectedCheckinTime === checkinTime);

    it(`should contains an appropriate checkin time`, () => {
      assert.ok(hasExpectedCheckinTime, `There is no such checkin time`);
    });
  });

  describe(`Offer.checkout`, () => {
    const checkoutTime = entity.offer.checkout;
    const hasExpectedCheckoutTime = CHECK_IN_OUT_TIMES.some((expectedCheckoutTime) => expectedCheckoutTime === checkoutTime);

    it(`should contains an appropriate checkout time`, () => {
      assert.ok(hasExpectedCheckoutTime, `There is no such checkout time`);
    });
  });

  describe(`Offer.features`, () => {
    const features = entity.offer.features;

    it(`should be an array`, () => {
      assert.ok(Array.isArray(features), `Features is not an array`);
    });

    it(`should have length not more than ${FEATURES.length}`, () => {
      assert.ok(features.length <= FEATURES.length, `Features length should be not more than ${FEATURES.length}. It's ${features.length}`);
    });

    it(`should have no repeated values`, () => {
      assert.ok(hasNoRepeatedValues(features), `Features array values are not unique`);
    });
  });

  describe(`Offer.description`, () => {
    const description = entity.offer.description;

    it(`should be a string`, () => {
      assert.strictEqual(typeof description, `string`);
    });

    it(`should be an empty string`, () => {
      assert.strictEqual(description, ``);
    });
  });

  describe(`Offer.photos`, () => {
    const photos = entity.offer.photos;

    it(`should be an array`, () => {
      assert.ok(Array.isArray(photos), `Photos is not an array`);
    });

    it(`should have length equal to ${PHOTO_URLS.length}`, () => {
      assert.strictEqual(photos.length, PHOTO_URLS.length);
    });

    it(`should have no repeated values`, () => {
      assert.ok(hasNoRepeatedValues(photos), `Photos array values are not unique`);
    });
  });

  describe(`The returned object property "location"`, () => {
    const location = entity.location;

    it(`should be the property of returned object`, () => {
      const propertyName = `location`;
      assert.ok(entity.hasOwnProperty(propertyName), `There is no such property in returned object`);
    });

    it(`should be an object`, () => {
      assert.strictEqual(typeof location, `object`);
      assert.notStrictEqual(location, null);
    });

    it(`should have "x" property`, () => {
      const propertyName = `x`;
      assert.ok(location.hasOwnProperty(propertyName), `There is no such property in "location"`);
    });

    it(`should have "y" property`, () => {
      const propertyName = `y`;
      assert.ok(location.hasOwnProperty(propertyName), `There is no such property in "location"`);
    });
  });

  describe(`Location.x`, () => {
    const xPoint = entity.location.x;

    it(`should be a number`, () => {
      assert.strictEqual(typeof xPoint, `number`);
    });

    it(`should be >= ${CoordinateX.MIN}`, () => {
      assert.ok(xPoint >= CoordinateX.MIN, `X should be equal or over than ${CoordinateX.MIN}`);
    });

    it(`should be <= ${CoordinateX.MAX}`, () => {
      assert.ok(xPoint <= CoordinateX.MAX, `X should be less or equal to ${CoordinateX.MAX}`);
    });
  });

  describe(`Location.y`, () => {
    const yPoint = entity.location.y;

    it(`should be a number`, () => {
      assert.strictEqual(typeof yPoint, `number`);
    });

    it(`should be >= ${CoordinateY.MIN}`, () => {
      assert.ok(yPoint >= CoordinateY.MIN, `Y should be equal or over than ${CoordinateY.MIN}`);
    });

    it(`should be <= ${CoordinateY.MAX}`, () => {
      assert.ok(yPoint <= CoordinateY.MAX, `Y should be less or equal to ${CoordinateY.MAX}`);
    });
  });

  describe(`The returned object property "date"`, () => {
    const date = entity.date;

    it(`should be the property of returned object`, () => {
      const propertyName = `date`;
      assert.ok(entity.hasOwnProperty(propertyName), `There is no ${propertyName} property in returned object`);
    });

    it(`should be later than now`, () => {
      assert.ok(date < Date.now());
    });

    it(`should be earlier than 7 days ago`, () => {
      assert.ok(date > Date.now() - TIME_INTERVAL);
    });
  });
});
