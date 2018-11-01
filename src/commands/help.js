const AbsctractCommand = require(`./abstract-command`);

const author = require(`./author`);
const colors = require(`colors`);
const description = require(`./description`);
const license = require(`./license`);
const server = require(`./server`);
const version = require(`./version`);

const commands = [version, license, author, description, server];

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

module.exports = new Help(`help`, `Shows available commands`);
