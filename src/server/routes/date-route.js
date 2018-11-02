const {asyncMiddleware} = require(`../../utils/util-functions`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const {FormFields} = require(`../server-settings`);
const logger = require(`../logger`);
const NotFoundError = require(`../errors/not-found-error`);

const getOfferHtml = (offer) => {
  const author = offer.author.name ? offer.author.name : `Unknown`;
  const description = offer.description ? offer.description : ``;

  const photo = offer.offer.photos ? offer.offer.photos.map((it) => `<img src="${it}" width="150">`) : ``;

  return `
<article>
  <p>${FormFields.author} - ${author}</p>
  <img src="${offer.author.avatar}" width="70">
  <p>${FormFields.title} - ${offer.offer.title}</p>
  <p>${FormFields.price} - ${offer.offer.price}</p>
  <p>${FormFields.type} - ${offer.offer.type}</p>
  <p>${FormFields.rooms} - ${offer.offer.rooms}</p>
  <p>${FormFields.guests} - ${offer.offer.guests}</p>
  <p>${FormFields.checkin} - ${offer.offer.checkin}</p>
  <p>${FormFields.checkout} - ${offer.offer.checkout}</p>
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
      const htmlToSend = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>GET request data</title>
  </head>
  <body>
    ${getOfferHtml(offerToSend)}
  </body>
</html>`;

      res.send(htmlToSend);
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
