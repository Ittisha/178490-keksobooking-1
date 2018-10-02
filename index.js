require(`colors`);
const {SUCCESS_CODE, ERROR_CODE, PROGRAM_TITLE} = require(`./src/utils/util-data`);
const {author: authorInfo} = require(`./package.json`);
const help = require(`./src/commands/help`);

const inputArguments = process.argv.slice(2);

class Program {
  static init(inputCommands) {
    if (!inputCommands.length) {
      Program.printOutput(Program.getGreetingMessage(), SUCCESS_CODE);
    }

    for (const command of inputCommands) {
      const requiredCommand = Program.getModule(command.slice(2));

      if (requiredCommand) {
        Program.printOutput(requiredCommand.execute(), SUCCESS_CODE);
      } else {
        Program.printOutput(Program.getErrorMessage(command), ERROR_CODE);
        console.log(help.execute());
        process.exit(ERROR_CODE);
      }
    }

    process.exit(SUCCESS_CODE);
  }

  static getGreetingMessage() {
    return `Hi user!\nThis program will start the server «${PROGRAM_TITLE}».\nAuthor: ${authorInfo}.`;
  }

  static getErrorMessage(command) {
    return `Unknown command ${command}`.red;
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
