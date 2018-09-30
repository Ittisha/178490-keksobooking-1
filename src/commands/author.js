const AbstractCommand = require(`./abstract-command`);
const packageAuthor = require(`../../package.json`);

class Author extends AbstractCommand {
  execute() {
    return packageAuthor.author;
  }
}

module.exports = new Author(`author`, `Shows program author`);
