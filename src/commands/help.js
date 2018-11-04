const colors = require(`colors`);

const AbsctractCommand = require(`./abstract-command`);

const author = require(`./author`);
const {Commands} = require(`../utils/util-constants`);
const description = require(`./description`);
const fill = require(`./fill`);
const license = require(`./license`);
const server = require(`./server`);
const version = require(`./version`);

const commands = [version, license, author, description, server, fill];

const PREFIX = `--`;

class Help extends AbsctractCommand {

  execute() {
    return this._getHelpOutput();
  }

  _getHelpOutput() {
    const commandsList = commands.map((command) => `${(PREFIX + command.name).grey} - ${command.description.green}`).join(`\n`);

    return `\nUsage: node index.js <command>\n\nwhere <command> is one of:\n${colors.grey(`--help`)} - ${colors.green(`Shows available commands`)}\n${commandsList}`;
  }
}

module.exports = new Help(Commands.help, `Shows available commands`);
