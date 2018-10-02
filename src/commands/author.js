const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class Author extends AbstractCommand {
  execute() {
    return packageInfo.author;
  }
}

module.exports = new Author(`author`, `Shows program author`);
