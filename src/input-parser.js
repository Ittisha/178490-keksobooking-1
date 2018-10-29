const readline = require(`readline`);
const {SUCCESS_CODE, ERROR_CODE, UsersBooleanAnswers} = require(`./utils/util-constants`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateEntity = require(`./test/generate/generate-entity`);

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
    rl.question(`Hello! Do you want to generate data? (y/n) \n`, (answer) => {
      switch (answer) {
        case UsersBooleanAnswers.YES:
          resolve(true);
          break;
        case UsersBooleanAnswers.NO:
          console.log(`Bye!`);
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

const shouldRewrite = () => {
  return new Promise((resolve) => {
    rl.question(`File already exists. Do you want to rewrite it? (y/n)\n`, (answer) => {
      if (answer !== UsersBooleanAnswers.YES && answer !== UsersBooleanAnswers.NO) {
        console.log(`Unknown command ${answer}!`);
      }
      return resolve(answer === UsersBooleanAnswers.YES);
    });
  });
};

const getSavingPath = () => {
  return new Promise((resolve) => {
    rl.question(`Where to save the data? (path)\n`, async (path) => {
      if (fs.existsSync(path)) {
        let rewriteMark = await shouldRewrite();
        if (!rewriteMark) {
          return resolve(void 0);
        }
      }
      return resolve(path);
    });
  });
};

const writeToFile = promisify(fs.writeFile);

module.exports.parseInitialInput = async () => {
  await repeatQuestion(shouldStart).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  let entetiesQuantity = await repeatQuestion(getEntitiesQuantity).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  const path = await repeatQuestion(getSavingPath).catch((err) => {
    console.error(err);
    process.exit(ERROR_CODE);
  });

  const entities = [];

  while (entetiesQuantity > 0) {
    const entity = generateEntity();
    entities.push(entity);
    --entetiesQuantity;
  }

  try {
    await writeToFile(path, JSON.stringify(entities));
    console.log(`The data were saved. Path: ${path}`);
  } catch (err) {
    console.error(err.message);
    process.exit(ERROR_CODE);
  }
  process.exit(SUCCESS_CODE);
};
