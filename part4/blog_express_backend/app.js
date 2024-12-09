const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// Middlewares & Utils
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./utils/config');
const midlwr = require('./utils/middleware');
const logger = require('./utils/logger');

// Routers
const blogRouter = require('./controllers/blogs');
const creatorsRouter = require('./controllers/creators');
const loginRouter = require('./controllers/login');

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
app.use(midlwr.tokenExtractor);

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/', blogRouter);
app.use('/api/blogs', midlwr.userExtractor, blogRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/login', loginRouter);

app.use(midlwr.unknownEndpoint);
app.use(midlwr.errorHandler);

module.exports = app;
