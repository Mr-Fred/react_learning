const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../Models');
const {JWT_SECRET} = require('../utils/config');

const loginRouter = express.Router();

loginRouter.post('/login', async function login (req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  // This assumes you have a `disabled` boolean field on your User model.
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, JWT_SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

loginRouter.post('/signup', async function signup (req, res) {
  const { username, name, password } = req.body;

  // Let the database model's validations handle username/name presence and uniqueness.
  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  // The beforeCreate hook in the User model will handle the hashing.
  const user = await User.create({ username, name, passwordHash: password });
  res.status(201).json(user);
});

module.exports = loginRouter;
