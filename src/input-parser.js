const readline = require(`readline`);

const fill = require(`./commands/fill`);
const helpCommand = require(`./commands/help`);
const server = require(`./commands/server`);
const {SUCCESS_CODE,
  ERROR_CODE,
  UsersBooleanAnswers} = require(`./utils/util-constants`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on(`error`, (err) => {
  console.error(err);
  process.exit(ERROR_CODE);
});

const repeatQuestion = async (fn) => {
  let response;
  do {
    response = await fn();
  } while (!response);
  return response;
};

const shouldStart = () => {
  return new Promise((resolve) => {
    rl.question(`Do you want to generate data and start the server? (y/n) \n`, (answer) => {
      switch (answer) {
        case UsersBooleanAnswers.YES:
          resolve(true);
          break;
        case UsersBooleanAnswers.NO:
          console.log(`Bye!\n`, `${helpCommand.execute()}`);
          rl.close();
          process.exit(SUCCESS_CODE);
          break;
        default:
          resolve(void 0);
      }
    });
  });
};

const getEntitiesQuantity = () => {
  return new Promise((resolve) => {
    rl.question(`How many entities should be generated? (number)\n`, (quantity) =>{
      if (!Number.isInteger(Number(quantity))) {
        console.log(`${quantity} is not an appropriate number.`);
        return resolve(void 0);
      }
      return resolve(quantity);
    });
  });
};

module.exports.parseInitialInput = async () => {
  await repeatQuestion(shouldStart).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  let entetiesQuantity = await repeatQuestion(getEntitiesQuantity).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  await fill.execute(entetiesQuantity).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  server.execute();
};
