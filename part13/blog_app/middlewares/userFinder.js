const { User } = require('../Models');

const userFinder = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    req.targetUser = user;
    next();
  } else {
    res.status(404).end();
  }
};

module.exports = userFinder;
