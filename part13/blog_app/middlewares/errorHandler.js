'use strict';

const { info, error } = require('./logger');

const errorHandler = (error, request, response, next) => {
  info('--- Error Handler ---');
  error('Error name:', error.name);
  error('Error message:', error.message);
  info('---');

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors.map(e => e.message) });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    // Handle duplicate username or other unique constraint violations
    return response.status(400).json({ error: error.errors.map(e => e.message) });
  } else if (error.name === 'AuthorizationError') {
    return response.status(403).json({ error: error.message });
  }

  // Fallback for any other error
  // Standard Error properties are not enumerable, so JSON.stringify(error) is just '{}'.
  // We must explicitly extract the message.
  return response.status(500).json({ error: error.message || 'An unexpected error occurred' });
};

module.exports = errorHandler;