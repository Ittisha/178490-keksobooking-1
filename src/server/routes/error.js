const {StatusCodes} = require(`../server-settings`);
const MongoError = require(`mongodb`).MongoError;

const getHtmlError = (err) => {
  let errorMessageTemplate = `<p>${err.message}</p>`;

  if (err.errors && Array.isArray(err.errors)) {
    const errorsListHtml = err.errors.reduce((accumulator, currentValue) => {
      const errorHtml = `<li>${currentValue.fieldName}: ${currentValue.errorMessage}</li>`;
      return accumulator + errorHtml;
    }, ``);

    errorMessageTemplate = `<ul>${errorsListHtml}<ul>`;
  }
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
      <meta charset="UTF-8">
      <title>Error occurs</title>
  </head>
  <body>
  ${errorMessageTemplate}
  </body>
  </html>`;
};

const getJsonError = (err) => {
  const {code, message} = err;
  return err.errors ? err.errors : {code, message};
};

module.exports = (router) => {
  const ERROR_HANDLER = (err, req, res, _next) => {
    if (err instanceof MongoError) {
      res.status(StatusCodes.BAD_REQUEST).json(err.message);
      return;
    }

    if (err) {
      const acceptsHtml = req.accepts(`html`) === `html`;
      const errorMessage = acceptsHtml ? getHtmlError(err) : getJsonError(err);
      res.status(err.code).send(errorMessage);
    }
  };

  router.use(ERROR_HANDLER);
};
