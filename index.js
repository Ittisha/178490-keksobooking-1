const {SUCCESS_CODE, ERROR_CODE, ERROR_COLOR, DEFAULT_COLOR, PROGRAM_TITLE} = require(`./src/util-data`);
const version = require(`./src/commands/version`);
const help = require(`./src/commands/help`);
const license = require(`./src/commands/license`);
const author = require(`./src/commands/author`);
const description = require(`./src/commands/description`);

const inputArguments = process.argv.slice(2);

class Program {

  constructor(inputCommands, title) {
    this.inputCommands = inputCommands;
    this.title = title;

    this.programCommands = [version, help, license, author, description];
  }

  _getGreetingMessage() {
    return `Hi user!\nThis program will start the server «${this.title}».\nAuthor: ${author.execute()}.`;
  }

  _getErrorMessage(command) {
    return `Unknown command ${command}`;
  }

  _printOutput(outputMessage, exitCode) {
    if (exitCode === ERROR_CODE) {
      console.error(ERROR_COLOR, outputMessage, DEFAULT_COLOR);
      return;
    }

    console.log(outputMessage);
  }

  init() {
    if (!this.inputCommands.length) {
      this._printOutput(this._getGreetingMessage(), SUCCESS_CODE);
    }

    for (const command of this.inputCommands) {
      const requiredCommand = this.programCommands.find((item) => command.slice(2) === item.name);
      if (requiredCommand) {
        this._printOutput(requiredCommand.execute(), SUCCESS_CODE);
      } else {
        this._printOutput(this._getErrorMessage(command), ERROR_CODE);
        console.log(help.execute());
        process.exit(ERROR_CODE);
      }
    }

    process.exit(SUCCESS_CODE);
  }
}

const program = new Program(inputArguments, PROGRAM_TITLE);
program.init();
