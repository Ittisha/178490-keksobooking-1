const AbstractCommand = require(`./abstract-command`);
const {Commands} = require(`../utils/util-constants`);
const packageInfo = require(`../../package.json`);

class Author extends AbstractCommand {
  execute() {
    return packageInfo.author;
  }
}

module.exports = new Author(Commands.author, `Shows program author`);
