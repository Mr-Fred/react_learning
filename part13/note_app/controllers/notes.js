const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../util/config')

const { Note, User } = require('../models')

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.get('/', async function getAllNotes(req, res) {
  let where = {}
  
  if (req.query.important) {
    where.important = req.query.important === "true"
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }
  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  });
  res.json(notes);
});

router.post('/', tokenExtractor, async function createNote(req, res) {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date()
    });
    res.json(note);
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', noteFinder, async function getNoteById(req, res) {
  const note = req.note;
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
})

router.delete('/:id', noteFinder, async function deleteNoteById(req, res) {
  const note = req.note;
  if (note) {
    await note.destroy();
  }
  res.status(204).end();
})

router.put('/:id', noteFinder, async function updateNoteById(req, res) {
  const note = req.note;
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router