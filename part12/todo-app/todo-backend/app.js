const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

// The healthcheck endpoint should be defined before any other routers
// to ensure it's always reachable and not intercepted by other routes.
app.get('/healthz', (req, res) => {
  // A simple healthcheck that just confirms the server is up.
  res.status(200).send('ok');
});

app.use('/', indexRouter);
app.use('/todos', todosRouter);

// Catch 404 and forward to a general error handler
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler to prevent crashes on exceptions
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

module.exports = app;
