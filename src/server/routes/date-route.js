const {asyncMiddleware} = require(`../../utils/util-functions`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);

module.exports = (router) => {
  router.get(`/:date`, asyncMiddleware(async (req, res) => {
    const date = Number(req.params.date);

    if (!date) {
      throw new IllegalArgumentError(`Request doesn't contain the date`);
    }

    const offerToSend = await router.offersStore.getOffer(date);

    if (!offerToSend) {
      throw new NotFoundError(`Offer with the ${date} date can't be found`);
    }

    res.send(Object.assign({}, offerToSend, {_id: void 0}));
  }));

  router.get(`/:date/avatar`, asyncMiddleware(async (req, res) => {
    const date = Number(req.params.date);

    if (!date) {
      throw new IllegalArgumentError(`Request doesn't contain the date`);
    }

    const foundOffer = await router.offersStore.getOffer(date);

    if (!foundOffer) {
      throw new NotFoundError(`Offer with the ${date} date can't be found`);
    }

    const result = await router.imagesStore.get(foundOffer._id);

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
};
