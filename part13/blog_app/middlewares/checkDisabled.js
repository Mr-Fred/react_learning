const { AuthorizationError } = require('../utils/errors');

/**
 * Middleware to check if the authenticated user is disabled.
 * If the user is disabled, an AuthorizationError is thrown.
 */
const checkDisabled = (req, res, next) => {
  if (req.user?.disabled) {
    throw new AuthorizationError(
      'Account disabled. Please contact the administrator.'
    );
  }

  next();
};

module.exports = checkDisabled;