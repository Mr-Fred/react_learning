'use strict';

const { User } = require('../Models');
const { AuthorizationError } = require('../utils/errors');

const auth = async (req, res, next) => {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }

  try {
    const user = await User.findByPk(req.session.user.id);

    if (!user) {
      const err = new AuthorizationError('User not found for this session.');
      // Destroy the invalid session and then pass the error to the handler
      return req.session.destroy(() => next(err));
    }

    if (user.disabled) {
      const err = new AuthorizationError('Account disabled, please contact admin. You have been logged out.');
      // Destroy the session for the disabled user and then pass the error
      return req.session.destroy(() => next(err));
    }

    // Attach the full, current user object to the request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
