const express = require('express');
const usersRouter = require('./routes/users');
const colRouter=require('./routes/coldata')

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);
  app.use(colRouter)

  return app;
};
