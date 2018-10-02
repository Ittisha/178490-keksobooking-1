const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class Description extends AbstractCommand {
  execute() {
    return packageInfo.description;
  }
}

module.exports = new Description(`description`, `Shows program description`);
