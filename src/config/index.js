const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({path: `.env.${process.env.NODE_ENV}`})
}

const PORT = process.env.PORT;
const AWS_REGION = process.env.AWS_REGION;
const DDB_EXPENSES_TABLE_NAME = process.env.DDB_EXPENSES_TABLE_NAME;

module.exports = {
  PORT,
  DDB_EXPENSES_TABLE_NAME,
  AWS_REGION
}