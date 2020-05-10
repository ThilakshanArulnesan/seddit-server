const readline = require('readline');
require('dotenv').config(); // load .env data into process.env

const db = require('../../config/keys').mongoURI;
const mongoose = require('mongoose');

const script1 = require('./1');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const connectToDB = async () => {
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));
};

const askQuestions = () => {
  rl.question(
    `This will run all required MongoDB update/upgrade.
Are you sure you want to continue? (Y/n)`,
    async (answer) => {
      if (['', 'Y', 'y'].includes(answer)) {
        await script1();
      }
      process.exit();
    },
  );
};

const main = async () => {
  await connectToDB();
  askQuestions();
};

main();
