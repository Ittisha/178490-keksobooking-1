const AbsctractCommand = require(`./abstract-command`);
const version = require(`./version`);
const license = require(`./license`);
const author = require(`./author`);
const description = require(`./description`);

const commands = [version, license, author, description];

class Help extends AbsctractCommand {

  execute() {
    return this._getHelpOutput();
  }

  _getHelpOutput() {
    const commandsList = commands.map((command) => `--${command.name} - ${command.description}`).join(`\n`);

    return `Available commands\n--help - Shows available commands\n${commandsList}`;
  }
}

module.exports = new Help(`help`, `Shows available commands`);
