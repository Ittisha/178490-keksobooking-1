const express = require(`express`);

const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const MongoError = require(`mongodb`).MongoError;

const {OFFERS_LIMIT,
  OFFERS_SKIP,
  NAMES,
  StatusCodes} = require(`../server-settings`);
const {getRandomArrayItem} = require(`../../utils/util-functions`);
const multer = require(`multer`);
const validate = require(`./validate`);

const offersRouter = new express.Router();
const jsonParser = express.json();
const toStream = require(`buffer-to-stream`);
const upload = multer({storage: multer.memoryStorage()}).fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 1}
]);

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (cursor, skip = OFFERS_SKIP, limit = OFFERS_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const {limit = OFFERS_LIMIT, skip = OFFERS_SKIP} = req.query;
  const limitNumber = Number(limit);
  const skipNumber = Number(skip);

  if (isNaN(skipNumber) || isNaN(limitNumber)) {
    throw new IllegalArgumentError(`Wrong request parameters "skip" or "limit"`);
  }

  res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skip, limit));
}));

offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const date = Number(req.params.date);

  if (!date) {
    throw new IllegalArgumentError(`Request doesn't contain the date`);
  }

  const offerToSend = await offersRouter.offersStore.getOffer(date);

  if (!offerToSend) {
    throw new NotFoundError(`Offer with the ${date} date can't be found`);
  }

  res.send(offerToSend);
}));

offersRouter.get(`/:date/avatar`, asyncMiddleware(async (req, res) => {
  const date = Number(req.params.date);

  if (!date) {
    throw new IllegalArgumentError(`Request doesn't contain the date`);
  }

  const foundOffer = await offersRouter.offersStore.getOffer(date);

  if (!foundOffer) {
    throw new NotFoundError(`Offer with the ${date} date can't be found`);
  }

  const result = await offersRouter.imagesStore.get(foundOffer._id);

  if (!result) {
    throw new NotFoundError(`Avatar with date "${date}" can't be found`);
  }

  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);
  res.on(`error`, (err) => console.error(err));
  res.on(`end`, () => res.end());

  const stream = result.stream;
  stream.on(`error`, (err) => console.error(err));
  stream.on(`end`, () => res.end());
  stream.pipe(res);


}));

offersRouter.post(``, jsonParser, upload, asyncMiddleware(async (req, res) => {
  const body = req.body;
  const files = req.files;
  let avatar;
  let preview;

  if (!body.name) {
    body.name = getRandomArrayItem(NAMES);
  }

  if (files) {
    avatar = files[`avatar`] ? files[`avatar`][0] : void 0;
    preview = files[`preview`] ? files[`preview`][0] : void 0;
  }

  if (avatar) {
    body.avatar = {
      name: avatar.originalname,
      mimetype: avatar.mimetype,
    };
  }

  if (preview) {
    body.preview = {
      name: preview.originalname,
      mimetype: preview.mimetype,
    };
  }

  const validatedOffer = validate(body);
  const result = await offersRouter.offersStore.save(validatedOffer);
  const {insertedId} = result;

  if (avatar) {
    await offersRouter.imagesStore.save(insertedId, toStream(avatar.buffer));
  }

  if (preview) {
    await offersRouter.imagesStore.save(insertedId, toStream(preview.buffer));
  }

  res.send(validate(body));
}));


offersRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(StatusCodes.BAD_REQUEST).json(err.message);
    return;
  }
  res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
});

module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imagesStore = imagesStore;
  return offersRouter;
};
