const {Router} = require(`express`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);
const {OFFERS_LIMIT, OFFERS_SKIP} = require(`../server-settings`);
const offers = require(`./offers`);
const offersRouter = new Router();

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

offersRouter.get(``, getOffersHandler);
offersRouter.get(`/:date`, getDateOfferHandler);

module.exports = offersRouter;
