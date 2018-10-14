const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const readTheFile = promisify(fs.readFile);

const {ERROR_CODE} = require(`../utils/util-constants`);

const {ContentType,
  DEFAULT_MIME_TYPE,
  ERROR_ADDRESS_IN_USE,
  SERVER_HOST,
  SERVER_PORT,
  StatusCodes} = require(`./server-settings`);

const STATIC_DIR = path.join(process.cwd(), `static`);

module.exports = class LocalServer {
  constructor(port = SERVER_PORT) {
    this.port = port;
    this.host = SERVER_HOST;
  }

  start() {
    this._server.listen(this.port, this.host, () => {
      console.log(`Local server is running at http://${this.host}:${this.port}`);
    });
  }

  _serverErrorHandler(err) {
    if (err.code === ERROR_ADDRESS_IN_USE) {
      console.log(`Port ${err.port} is in use`);
      process.exit(ERROR_CODE);
    }
  }

  get _server() {
    const server = http.createServer((req, res) => {
      const absolutePath = this._getAbsolutePath(req.url);

      (async () => {
        try {
          await this._readFile(absolutePath, res);
        } catch (err) {
          res.writeHead(StatusCodes.NOT_FOUND, http.STATUS_CODES[StatusCodes.NOT_FOUND]);
          res.end();
        }
      })().catch((err) => {
        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, err.message, {
          'Content-Type': DEFAULT_MIME_TYPE
        });
        res.end(err.message);
      });
    });

    server.on(`error`, this._serverErrorHandler);
    return server;
  }

  _getMimeType(filePath) {
    const extension = path.extname(filePath).substring(1);

    if (Object.keys(ContentType).includes(extension.toUpperCase())) {
      return ContentType[extension.toUpperCase()];
    }

    return DEFAULT_MIME_TYPE;
  }

  async _readFile(filePath, res) {
    const fileContent = await readTheFile(filePath);

    res.statusCode = StatusCodes.OK;
    res.starusMessage = http.STATUS_CODES[StatusCodes.OK];
    res.setHeader(`Content-Type`, this._getMimeType(filePath));
    res.setHeader(`Content-Length`, Buffer.byteLength(fileContent));
    res.end(fileContent);
  }

  _getAbsolutePath(requestUrl) {
    const {pathname: localPath} = url.parse(requestUrl);
    if (localPath === `/`) {
      return path.join(STATIC_DIR, `index.html`);
    }
    return STATIC_DIR + localPath;
  }
};
