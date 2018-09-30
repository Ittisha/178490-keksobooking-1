const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class Version extends AbstractCommand {
  execute() {
    return `v${packageInfo.version}`;
  }
}

module.exports = new Version(`version`, `Shows program version`);
