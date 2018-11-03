const {FormFields} = require(`../server-settings`);

const getOfferHtml = (offer) => {
  const author = offer.author.name ? offer.author.name : `Unknown`;
  const description = offer.description ? `<p>${offer.description}</p>` : ``;

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

module.exports.getOfferHtml = getOfferHtml;

const getPageTemplate = (bodyContent) => {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>GET request data</title>
    </head>
    <body>
      ${bodyContent}
    </body>
  </html>`;
};

module.exports.getPageTemplate = getPageTemplate;
