const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('notes', {content: 1, important: 1})

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const {username, name, password} = req.body
  const saltRound = 10;

  const passwordHash = await bcrypt.hash(password, saltRound)
  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()

  res.status(201).json(savedUser);

});

module.exports = usersRouter;