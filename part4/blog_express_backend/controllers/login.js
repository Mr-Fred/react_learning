const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Creator = require('../models/Creator');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const creator = await Creator.findOne({ username });

  const isVerifiedCreator = creator === null
    ? false
    : await bcrypt.compare(password, creator.passwordHash);

  if (!(isVerifiedCreator && creator)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const dataForCreatorToken = {
    username: creator.username,
    id: creator._id,
  };
  const token = await jwt.sign(dataForCreatorToken, process.env.SECRET);
  return res.status(200).send({ token, username: creator.username, name: creator.name });
});

module.exports = loginRouter;
