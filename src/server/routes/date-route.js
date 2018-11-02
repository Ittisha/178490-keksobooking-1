const {asyncMiddleware} = require(`../../utils/util-functions`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const logger = require(`../logger`);
const NotFoundError = require(`../errors/not-found-error`);

const getOfferHtml = (offer) => {
  const author = offer.author.name ? offer.author.name : `Unknown`;
  const description = offer.description ? offer.description : ``;

  const photo = offer.photo ? offer.photo.map((it) => `<img src="${it}">`) : ``;

  return `
<article>
  <p>${author}</p>
  <img src="${offer.author.avatar}">
  <p>${offer.offer.title}</p>
  <p>${offer.offer.price}</p>
  <p>${offer.offer.type}</p>
  <p>${offer.offer.rooms}</p>
  <p>${offer.offer.guests}</p>
  <p>${offer.offer.checkin}</p>
  <p>${offer.offer.chekout}</p>
  ${description}
  ${photo}
  <p>${new Date(offer.date).toLocaleString()}</p>
</article>`.trim();
};

module.exports = (router) => {
  router.get(`/:date`, asyncMiddleware(async (req, res) => {
    const doesAcceptHtml = req.accepts([`json`, `html`]) === `html`;
    const date = Number(req.params.date);

    if (!date) {
      throw new IllegalArgumentError(`Request doesn't contain the date`);
    }

    const offerToSend = await router.offersStore.getOffer(date);

    if (!offerToSend) {
      throw new NotFoundError(`Offer with the ${date} date can't be found`);
    }

    if (doesAcceptHtml) {
      res.send(getOfferHtml(offerToSend));
      return;
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
    res.on(`error`, (err) => logger.error(err));
    res.on(`end`, () => res.end());

    const stream = result.stream;
    stream.on(`error`, (err) => logger(err));
    stream.on(`end`, () => res.end());
    stream.pipe(res);
  }));
};
