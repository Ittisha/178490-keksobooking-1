const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class License extends AbstractCommand {
  execute() {
    return packageInfo.license;
  }
}

module.exports = new License(`license`, `Shows program license`);
