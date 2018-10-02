const colors = require(`colors`);
const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class License extends AbstractCommand {
  execute() {
    return colors.yellow(packageInfo.license);
  }
}

module.exports = new License(`license`, `Shows program license`);
