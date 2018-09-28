const AbstractCommand = require(`./abstract-command`);
const packageLicense = require(`../../package.json`);

class License extends AbstractCommand {
  execute() {
    return packageLicense.license;
  }
}

module.exports = new License(`license`, `Shows program license`);
