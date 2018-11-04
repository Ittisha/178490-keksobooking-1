const AbstractCommand = require(`./abstract-command`);
const {Commands} = require(`../utils/util-constants`);
const packageInfo = require(`../../package.json`);

class Description extends AbstractCommand {
  execute() {
    return packageInfo.description;
  }
}

module.exports = new Description(Commands.description, `Shows program description`);
