const express = require('express');
const cors = require('cors');
const uuid = require('uuid')
// const requestId = require('express-request-id');
// import requestId from 'express-request-id';
const { ExpenseAPI } = require('./api/expense.api.js');
const { handleErrors } = require('./middlewares/error.handler.middleware.js');
const { PORT } = require('./config/index.js');

const expressApp = (app) => {

  // app.use(requestId());
  app.use(cors())
  app.use(express.json());

  app.use((req, _res, next) => {
    req.id = uuid.v4();
    next();
  })

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Expense service is up and running'
    });
  });

  ExpenseAPI(app);

  // app.use(LogHandler);
  app.use(handleErrors);

}

const app = express();
expressApp(app);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = {
  expressApp
}