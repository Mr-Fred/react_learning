require('dotenv').config()
const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  note ? res.status(200).json(note) : res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }

  const note = new Note({
    content: body.content,
    important: body.important? body.important : false,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const note = await Note.findById(req.params.id)
  if (note.user.toString() !== decodedToken.id) {
    return res.status(401).json({ error: 'only the creator can delete a note' })
  }

  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const note = await Note.findById(req.params.id)
  if (note.user.toString() !== decodedToken.id) {
    return res.status(401).json({ error: 'only the creator can edit a note' })
  }

  const newNote = {
    content: content,
    important: important,
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, newNote, { new: true })

  res.json(updatedNote)
})

module.exports = notesRouter