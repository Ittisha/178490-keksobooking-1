const AbstractCommand = require(`./abstract-command`);

const {Commands} = require(`../utils/util-constants`);
const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

class License extends AbstractCommand {
  execute() {
    return colors.yellow(packageInfo.license);
  }
}

module.exports = new License(Commands.license, `Shows program license`);
