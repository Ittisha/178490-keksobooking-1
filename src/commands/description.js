const AbstractCommand = require(`./abstract-command`);
const packageDecription = require(`../../package.json`);

class Description extends AbstractCommand {
  execute() {
    return packageDecription.description;
  }
}

module.exports = new Description(`description`, `Shows program description`);
