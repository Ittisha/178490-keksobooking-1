const SUCCESS_CODE = 0;
const ERROR_CODE = 1;
const ERROR_COLOR = `\x1b[31m`;
const DEFAULT_COLOR = `\x1b[0m`;

const inputArguments = process.argv.slice(2);

class Program {

  constructor (inputCommands, title = `Keksobooking`, author = `Anna`) {
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
        output: () => this._getHelpOutput(this.programCommands),
        exitCode: SUCCESS_CODE,
        helpMessage: `печатает этот текст`,
      }
    };

    this.init();
  }

  _getHelpOutput(commandsDescr) {
    let commandsList = `Доступные команды`;

    for (const command in commandsDescr) {
      commandsList = `${commandsList}\n ${command} - ${commandsDescr[command].helpMessage}`
    }

    return commandsList;
  }

  _getGreetingMessage() {
    return `Привет пользователь!\nЭта программа будет запускать сервер «${this.title}».\nАвтор: ${this.author}.`
  }

  _getErrorMessage(command) {
    return `Неизвестная команда ${command}.\n Чтобы прочитать правила использования приложения, наберите "--help"`
  }

  _printOutput(outputMessage, exitCode) {
    if (exitCode === SUCCESS_CODE) {
      console.log(outputMessage);
      return;
    }

    console.error(ERROR_COLOR, outputMessage, DEFAULT_COLOR);
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

const programm = new Program(inputArguments);
