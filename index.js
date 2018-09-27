const {SUCCESS_CODE, ERROR_CODE, ERROR_COLOR, DEFAULT_COLOR, AUTHOR, PROGRAM_TITLE} = require('./util-data');

const inputArguments = process.argv.slice(2);

class Program {

  constructor (inputCommands, title, author) {
    this.inputCommands = inputCommands;
    this.title = title;
    this.author = author;

    this.programCommands = {
      '--version': {
        output: () => `v.0.0.1`,
        exitCode: SUCCESS_CODE,
        helpMessage: `печатает версию приложения`,
      },

      '--help': {
        output: () => this._getHelpOutput(),
        exitCode: SUCCESS_CODE,
        helpMessage: `печатает этот текст`,
      }
    };

    this.init();
  }

  _getHelpOutput() {
    const commandsList = Object.entries(this.programCommands).map((command) =>
    `${command[0]} - ${command[1].helpMessage}`).join(`\n`);

    return `Доступные команды\n${commandsList}`;
  }

  _getGreetingMessage() {
    return `Привет пользователь!\nЭта программа будет запускать сервер «${this.title}».\nАвтор: ${this.author}.`
  }

  _getErrorMessage(command) {
    return `Неизвестная команда ${command}.\n Чтобы прочитать правила использования приложения, наберите "--help"`
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
      if (this.programCommands[command]) {
        this._printOutput(this.programCommands[command].output(), SUCCESS_CODE);
      } else {
        this._printOutput(this._getErrorMessage(command), ERROR_CODE);
        process.exit(ERROR_CODE);
      }
    }

    process.exit(SUCCESS_CODE);
  }
}

const programm = new Program(inputArguments, PROGRAM_TITLE, AUTHOR);
