const { AuthorizationError } = require('../utils/errors');

/**
 * Middleware to ensure that the authenticated user is an admin.
 * Throws an AuthorizationError if the user is not an admin.
 */
const adminOnly = (req, res, next) => {
  if (!req.user?.admin) {
    throw new AuthorizationError('Admin access required. Permission denied.');
  }
  next();
};

module.exports = adminOnly;