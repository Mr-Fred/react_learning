const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/config');
const { User } = require('../Models');

const auth = async function auth(req, res, next) {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
      req.user = await User.findByPk(decodedToken.id);
      if (!req.user) {
        return res.status(401).json({ error: 'token invalid' });
      }
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};

module.exports = auth;
