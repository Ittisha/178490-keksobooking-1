const express = require(`express`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);

const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const {getOfferHtml,
  getPageTemplate} = require(`./get-html-templates`);
const {asyncMiddleware,
  doesAcceptHtml,
  getRandomArrayItem,
  makeArray} = require(`../../utils/util-functions`);
const {DEFAULT_PATH,
  OFFERS_LIMIT,
  OFFERS_SKIP,
  NAMES} = require(`../server-settings`);
const validate = require(`./validate`);

const jsonParser = express.json();

const upload = multer({storage: multer.memoryStorage()}).fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`}
]);

const toPage = async (cursor, skip = OFFERS_SKIP, limit = OFFERS_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

const setAvatarUrl = (offerDate) => `${DEFAULT_PATH.substring(0)}/${offerDate}/avatar`;

const prepareForSaving = (receivedOffer) => {
  const [x, y] = receivedOffer.address.split(`,`);
  const date = Math.floor(Date.now());

  const offerToSave = {
    author: {
      name: receivedOffer.name,
    },
    offer: {
      title: receivedOffer.title,
      description: receivedOffer.description,
      address: receivedOffer.address,
      price: receivedOffer.price,
      type: receivedOffer.type,
      rooms: receivedOffer.rooms,
      guests: receivedOffer.guests,
      checkin: receivedOffer.checkin,
      checkout: receivedOffer.checkout,
      features: makeArray(receivedOffer.features),
      photos: []
    },
    location: {
      x: Number(x.trim()),
      y: Number(y.trim())
    },
    date
  };

  if (receivedOffer.avatar) {
    offerToSave.author.avatar = setAvatarUrl(date);
  }

  return offerToSave;
};

module.exports = (router) => {
  router.get(``, asyncMiddleware(async (req, res) => {
    const {limit = OFFERS_LIMIT, skip = OFFERS_SKIP} = req.query;
    const limitNumber = Number(limit);
    const skipNumber = Number(skip);

    if (isNaN(skipNumber) || isNaN(limitNumber)) {
      throw new IllegalArgumentError(`Wrong request parameters "skip" or "limit"`);
    }

    const offersToSend = await toPage(await router.offersStore.getAllOffers(), skipNumber, limitNumber);

    if (doesAcceptHtml(req)) {
      const offersHtmlTemplates = offersToSend.data.map((offer) => getOfferHtml(offer));

      const offersTemplate = offersHtmlTemplates.reduce((accumulator, currentTemplate) => (accumulator + currentTemplate + `\n`), ``);
      const htmlToSend = getPageTemplate(offersTemplate);

      res.send(htmlToSend);
      return;
    }

    res.send(offersToSend);
  }));


  router.post(``, jsonParser, upload, asyncMiddleware(async (req, res) => {
    const body = req.body;
    const files = req.files;
    let avatar;
    let preview;

    if (!body.name) {
      body.name = getRandomArrayItem(NAMES);
    }

    if (files) {
      avatar = files[`avatar`] ? files[`avatar`][0] : void 0;
      preview = files[`preview`] ? files[`preview`] : void 0;
    }

    if (avatar) {
      body.avatar = {
        name: avatar.originalname,
        mimetype: avatar.mimetype,
      };
    }

    if (preview) {
      body.preview = preview.map((it) => ({
        name: it.originalname,
        mimetype: it.mimetype,
      }));
    }

    const validatedOffer = validate(body);
    const offerToSave = prepareForSaving(validatedOffer);

    const result = await router.offersStore.save(offerToSave);
    const {insertedId} = result;

    if (avatar) {
      await router.avatarStore.save(insertedId, toStream(avatar.buffer));
    }

    if (preview) {
      await preview.forEach((photo, index) => {
        const photoId = `${insertedId}-${index}`;
        router.previewStore.save(photoId, toStream(photo.buffer));
      });
    }

    const offerToSend = validatedOffer;
    validatedOffer.features = makeArray(validatedOffer.features);

    validatedOffer.location = offerToSave.location;

    res.send(offerToSend);
  }));
};
