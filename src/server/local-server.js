const express = require(`express`);
const path = require(`path`);
const offersRoute = require(`./offers/route`);

const {SERVER_HOST,
  SERVER_PORT, StatusCodes} = require(`./server-settings`);

const STATIC_DIR = path.join(process.cwd(), `static`);

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`Page was not found`);
};
const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = class LocalServer {
  constructor(port = SERVER_PORT) {
    this.port = port;
    this.host = SERVER_HOST;
    this.app = express();
  }

  start() {
    this.setup();

    this.app.listen(this.port, this.host, () => {
      console.log(`Local server is running at http://${this.host}:${this.port}`);
    });
  }

  setup() {
    this.app.use(express.static(STATIC_DIR));
    this.app.use(`/api/offers`, offersRoute);
    this.app.use(NOT_FOUND_HANDLER);
    this.app.use(ERROR_HANDLER);
  }
};
