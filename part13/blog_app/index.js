'use strict';
/** 
 * @fileoverview simple blog application entry point
 * This file initializes the blog application, sets up the main components,
 * and starts the application.
*/

const express = require('express');
const {PORT} = require('./utils/config')
const { requestLogger, info } = require('./middlewares/logger');
const { connectToDatabase, sequelize } = require('./utils/db');
const blogRouter = require('./routes/blog');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs', blogRouter);

const start = async () => {
  await connectToDatabase();
  await sequelize.sync({ alter: true });
  app.listen(PORT, function logStatus(){
    info(`Server running on port ${PORT}`)
  })
};

start();