const colors = require(`colors`);
const {SUCCESS_CODE,
  ERROR_CODE, PROGRAM_TITLE,
  COMMAND_PREFIX_LENGH,
  PATH_ARGS_LENGTH,
  MAX_PORT,
  RESERVED_PORT} = require(`./src/utils/util-constants`);
const {author: authorInfo} = require(`./package.json`);
const help = require(`./src/commands/help`);
const {parseInitialInput} = require(`./src/input-parser`);

const inputArguments = process.argv.slice(PATH_ARGS_LENGTH);

class Program {
  static init(inputCommands) {
    if (!inputCommands.length) {
      Program.printOutput(Program.getGreetingMessage(), SUCCESS_CODE);
      parseInitialInput().catch((err) => {
        console.error(err);
        process.exit(ERROR_CODE);
      });
    } else {
      Program.executeCommand(inputCommands);
    }
  }

  static executeCommand(inputCommands) {
    const command = inputCommands[0];
    const requiredCommand = Program.getModule(command.slice(COMMAND_PREFIX_LENGH));

    if (!requiredCommand) {
      Program.printOutput(Program.getErrorMessage(command), ERROR_CODE);
      console.log(help.execute());
      process.exit(ERROR_CODE);
    }

    if (requiredCommand.name !== `server`) {
      Program.printOutput(requiredCommand.execute(), SUCCESS_CODE);
      process.exit(SUCCESS_CODE);
    }

    const port = inputCommands[1];

    Program.startServer(port, requiredCommand);
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

  static startServer(port, serverInstance) {
    const portNumber = Number(port);
    switch (true) {
      case !port:
        serverInstance.execute();
        break;
      case !Number.isInteger(portNumber):
        console.log(`Port number should be integer`);
        process.exit(ERROR_CODE);
        break;
      case portNumber === RESERVED_PORT:
        console.log(`Port 0 is reserved. It should not be used in TCP or UDP messages.`);
        process.exit(ERROR_CODE);
        break;
      case portNumber > MAX_PORT:
        console.log(`Port number should be less than or equal 65535.`);
        process.exit(ERROR_CODE);
        break;
      default:
        serverInstance.execute(port);
    }
  }
}

Program.init(inputArguments);
