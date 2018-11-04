const AbstractCommand = require(`./abstract-command`);

const {Commands} = require(`../utils/util-constants`);
const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

const {MAJOR_RELEASES_INDEX,
  MINOR_RELEASES_INDEX,
  PATCH_RELEASES_INDEX} = require(`../utils/util-constants`);

class Version extends AbstractCommand {
  execute() {
    const ranges = packageInfo.version.split(`.`);
    return `v${colors.red(ranges[MAJOR_RELEASES_INDEX])}.${colors.green(ranges[MINOR_RELEASES_INDEX])}.${colors.blue(ranges[PATCH_RELEASES_INDEX])}`;
  }
}

module.exports = new Version(Commands.version, `Shows program version`);
