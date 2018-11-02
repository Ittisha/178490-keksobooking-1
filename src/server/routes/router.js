const express = require(`express`);

const setDefaultRoute = require(`./default-route`);
const setDateRoute = require(`./date-route`);
const setErrorRoute = require(`./error`);
const enableCors = require(`./enable-cors`);

const offersRouter = new express.Router();

setDefaultRoute(offersRouter);
setDateRoute(offersRouter);
enableCors(offersRouter);
setErrorRoute(offersRouter);


module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imagesStore = imagesStore;
  return offersRouter;
};
