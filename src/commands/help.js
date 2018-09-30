require(`colors`);
const AbsctractCommand = require(`./abstract-command`);
const version = require(`./version`);
const license = require(`./license`);
const author = require(`./author`);
const description = require(`./description`);

const commands = [version, license, author, description];

const prefix = `--`;

class Help extends AbsctractCommand {

  execute() {
    return this._getHelpOutput();
  }

  _getHelpOutput() {
    const commandsList = commands.map((command) => `${(prefix + command.name).grey} - ${command.description.green}`).join(`\n`);

    return `Available commands\n${`--help`.grey} - ${`Shows available commands`.green}\n${commandsList}`;
  }
}

module.exports = new Help(`help`, `Shows available commands`);
