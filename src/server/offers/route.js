const express = require(`express`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const {OFFERS_LIMIT,
  OFFERS_SKIP,
  NAMES} = require(`../server-settings`);
const {getRandomArrayItem} = require(`../../utils/util-functions`);
const offers = require(`./offers`);
const multer = require(`multer`);
const validate = require(`./validate`);

const offersRouter = new express.Router();
const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()}).fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 1}
]);

const getOffersHandler = (req, res) => {
  const {limit = OFFERS_LIMIT, skip = OFFERS_SKIP} = req.query;
  const limitNumber = Number(limit);
  const skipNumber = Number(skip);

  const offersToSend = offers.slice(skipNumber, limitNumber + skipNumber);

  const response = {
    data: offersToSend,
    skip,
    limit,
    total: offersToSend.length
  };

  res.send(response);
};

const getDateOfferHandler = (req, res) => {
  const date = Number(req.params.date);

  if (!date) {
    throw new IllegalArgumentError(`Request doesn't contain the date`);
  }

  const offerToSend = offers.find((item) => item.date === date);

  if (!offerToSend) {
    throw new NotFoundError(`Offer with the ${date} date can't be found`);
  }

  res.send(offerToSend);
};

const postOfferHandler = (req, res) => {
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

  res.send(validate(body));
};

offersRouter.get(``, getOffersHandler);
offersRouter.get(`/:date`, getDateOfferHandler);
offersRouter.post(``, jsonParser, upload, postOfferHandler);
offersRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  } else {
    _next(err);
  }
});

module.exports = offersRouter;
