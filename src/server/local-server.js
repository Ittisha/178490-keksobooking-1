const express = require(`express`);
const imagesStore = require(`./store/images-store`);
const offersStore = require(`./store/store`);
const offersRouter = require(`./routes/router`)(offersStore, imagesStore);
const path = require(`path`);

const logger = require(`./logger`);

const {DEFAULT_SERVER_HOST,
  DEFAULT_SERVER_PORT,
  ERROR_ADDRESS_IN_USE,
  ImplementedMethods,
  StatusCodes} = require(`./server-settings`);

const {ERROR_CODE} = require(`../utils/util-constants`);

const {SERVER_PORT = DEFAULT_SERVER_PORT,
  SERVER_HOST = DEFAULT_SERVER_HOST} = process.env;

const STATIC_DIR = path.join(process.cwd(), `static`);

const NOT_FOUND_IMPLEMENTED_HANDLER = (req, res) => {
  if ((req.method === ImplementedMethods.GET) || (req.method === ImplementedMethods.POST)) {
    res.status(StatusCodes.NOT_FOUND).send(`Page was not found`);
    return;
  }
  res.status(StatusCodes.NOT_IMPLEMENTED_ERROR).send(`${StatusCodes.NOT_IMPLEMENTED_ERROR} ${req.method} is not implemented`);
};

const INTERNAL_SERVER_ERROR_HANDLER = (err, req, res, _next) => {
  logger.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`<p>500 Internal Server Error</p><p>Sorry, something went wrong.</p>`);
};

module.exports = class LocalServer {
  constructor(port = SERVER_PORT) {
    this._port = port;
    this._host = SERVER_HOST;
    this._app = express();
  }

  start() {
    this._setup();

    this._app.listen(this._port, this._host, () => {
      logger.info(`Local server is running at http://${this._host}:${this._port}`);
    }).on(`error`, this._serverInUseErrorHandler);
  }

  _setup() {
    this._app.disable(`x-powered-by`);
    this._app.use(express.static(STATIC_DIR));
    this._app.use(`/api/offers`, offersRouter);
    this._app.use(NOT_FOUND_IMPLEMENTED_HANDLER);
    this._app.use(INTERNAL_SERVER_ERROR_HANDLER);
  }

  _serverInUseErrorHandler(err) {
    if (err.code === ERROR_ADDRESS_IN_USE) {
      logger.error(`Port ${err.port} is in use`);
      process.exit(ERROR_CODE);
    }
  }
};
