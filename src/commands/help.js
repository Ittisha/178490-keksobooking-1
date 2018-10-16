const colors = require(`colors`);
const AbsctractCommand = require(`./abstract-command`);
const version = require(`./version`);
const license = require(`./license`);
const author = require(`./author`);
const description = require(`./description`);
const server = require(`./server`);

const commands = [version, license, author, description, server];

const prefix = `--`;

class Help extends AbsctractCommand {

  execute() {
    return this._getHelpOutput();
  }

  _getHelpOutput() {
    const commandsList = commands.map((command) => `${(prefix + command.name).grey} - ${command.description.green}`).join(`\n`);

    return `\nUsage: node index.js <command>\n\nwhere <command> is one of:\n${colors.grey(`--help`)} - ${colors.green(`Shows available commands`)}\n${commandsList}`;
  }
}

module.exports = new Help(`help`, `Shows available commands`);
