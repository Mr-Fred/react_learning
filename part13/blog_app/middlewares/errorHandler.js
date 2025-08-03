'use strict';

/**
 * @fileoverview Centralized error handling middleware.
 */

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  // Handle Sequelize validation errors
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.errors.map(e => e.message) });
  } else if (error.name === 'SequelizeDatabaseError') {
    // Handle malformed ID or other DB errors
    return res.status(400).json({ error: 'A database error occurred. Please check your input.' });
  }

  return next(error);
};

module.exports = errorHandler;

