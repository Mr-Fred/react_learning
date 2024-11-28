const express = require('express');
require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const router = require('./controllers/blogs');

logger.info('Initialising express app');
const app = express();

mongoose.set(
  'strictQuery',
  false,
);

logger.info('connecting to Database');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to Database');
  })
  .catch((error) => {
    logger.error('Error connecting to Database', error.message);
  });

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/', router);
app.use('/api/blogs', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
