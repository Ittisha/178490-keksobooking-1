const express = require(`express`);

const MongoError = require(`mongodb`).MongoError;
const {StatusCodes} = require(`../server-settings`);
const setDefaultRoute = require(`./default-route`);
const setDateRoute = require(`./date-route`);
const enableCors = require(`./enable-cors`);
const ValidationError = require(`../errors/validation-error`);

const offersRouter = new express.Router();

setDefaultRoute(offersRouter);
setDateRoute(offersRouter);
enableCors(offersRouter);

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
