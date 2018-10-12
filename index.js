const colors = require(`colors`);
const {SUCCESS_CODE,
  ERROR_CODE, PROGRAM_TITLE,
  COMMAND_PREFIX_LENGH,
  PATH_ARGS_LENGTH} = require(`./src/utils/util-constants`);
const {author: authorInfo} = require(`./package.json`);
const help = require(`./src/commands/help`);
const {startProgram} = require(`./src/input-parser`);

const inputArguments = process.argv.slice(PATH_ARGS_LENGTH);

class Program {
  static init(inputCommands) {
    if (inputCommands.length) {
      Program.executeCommand(inputCommands);
    }

    Program.printOutput(Program.getGreetingMessage(), SUCCESS_CODE);
    startProgram();
  }

  static executeCommand(inputCommands) {
    for (const command of inputCommands) {
      const requiredCommand = Program.getModule(command.slice(COMMAND_PREFIX_LENGH));

      if (!requiredCommand) {
        Program.printOutput(Program.getErrorMessage(command), ERROR_CODE);
        console.log(help.execute());
        process.exit(ERROR_CODE);
      }

      Program.printOutput(requiredCommand.execute(), SUCCESS_CODE);
    }

    process.exit(SUCCESS_CODE);
  }

  static getGreetingMessage() {
    return `Hi user!\nThis program will start the server «${PROGRAM_TITLE}».\nAuthor: ${authorInfo}.`;
  }

  static getErrorMessage(command) {
    return colors.red(`Unknown command ${command}`);
  }

  static printOutput(outputMessage, exitCode) {
    if (exitCode === ERROR_CODE) {
      console.error(outputMessage);
      return;
    }

    console.log(outputMessage);
  }

  static getModule(moduleName) {
    try {
      return require(`./src/commands/${moduleName}`);
    } catch (error) {
      return void 0;
    }
  }
}

Program.init(inputArguments);
