const express = require(`express`);
const path = require(`path`);
const offersStore = require(`./offers/store`);
const imagesStore = require(`./offers/images-store`);
const offersRouter = require(`./offers/route`)(offersStore, imagesStore);

const {SERVER_HOST,
  SERVER_PORT, StatusCodes} = require(`./server-settings`);

const STATIC_DIR = path.join(process.cwd(), `static`);

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`Page was not found`);
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
    this.app.disable(`x-powered-by`);
    this.app.use(express.static(STATIC_DIR));
    this.app.use(`/api/offers`, offersRouter);
    this.app.use(NOT_FOUND_HANDLER);
  }
};
