require(`dotenv`).config();

const colors = require(`colors`);

const {author: authorInfo} = require(`./package.json`);
const help = require(`./src/commands/help`);
const {parseInitialInput} = require(`./src/input-parser`);

const {ERROR_CODE,
  MAX_PORT,
  COMMAND_PREFIX_LENGH,
  RESERVED_PORT,
  SUCCESS_CODE,
  PATH_ARGS_LENGTH,
  PROGRAM_TITLE} = require(`./src/utils/util-constants`);

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

  static async executeCommand(inputCommands) {
    const command = inputCommands[0];
    const requiredCommand = Program.getModule(command.slice(COMMAND_PREFIX_LENGH));

    switch (true) {
      case !requiredCommand:
        Program.printOutput(Program.getErrorMessage(command), ERROR_CODE);
        console.log(help.execute());
        process.exit(ERROR_CODE);
        break;

      case requiredCommand.name === `fill`:
        const entetiesNumber = inputCommands[1];
        await requiredCommand.execute(entetiesNumber);
        process.exit(SUCCESS_CODE);
        break;

      case requiredCommand.name !== `server`:
        Program.printOutput(requiredCommand.execute(), SUCCESS_CODE);
        process.exit(SUCCESS_CODE);
        break;

      default:
        const port = inputCommands[1];
        Program.startServer(port, requiredCommand);
    }
  }

  static getGreetingMessage() {
    return `Hi user!\nThis program will start the server «${PROGRAM_TITLE}».\n`;
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
        console.error(`Port number should be an integer`);
        process.exit(ERROR_CODE);
        break;

      case portNumber === RESERVED_PORT:
        console.error(`Port 0 is reserved. It should not be used in TCP or UDP messages.`);
        process.exit(ERROR_CODE);
        break;

      case portNumber > MAX_PORT:
        console.error(`Port number should be less than or equal 65535.`);
        process.exit(ERROR_CODE);
        break;

      default:
        serverInstance.execute(port);
    }
  }
}

Program.init(inputArguments);
