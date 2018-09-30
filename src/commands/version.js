require(`colors`);
const AbstractCommand = require(`./abstract-command`);
const packageInfo = require(`../../package.json`);

class Version extends AbstractCommand {
  execute() {
    const ranges = packageInfo.version.split(`.`);
    return `v${ranges[0].red}.${ranges[1].green}.${ranges[2].blue}`;
  }
}

module.exports = new Version(`version`, `Shows program version`);
