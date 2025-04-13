const creatorsRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Creator = require('../models/Creator');

creatorsRouter.get('/', async (req, res) => {
  const creators = await Creator.find({});
  res.status(200).json(creators);
});

creatorsRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).send({ error: 'password must be at least 8 characters long' });
  }
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const newCreator = new Creator({
    name,
    username,
    passwordHash,
  });
  const savedCreator = await newCreator.save();
  res.status(201).json(savedCreator);
});

module.exports = creatorsRouter;
