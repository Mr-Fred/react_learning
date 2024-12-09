const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const getTokenFromReq = req => {
  
  const auth = req.get('Authorization')
  if(auth && auth.startsWith('Bearer')){
    return auth.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({})
    .populate('user', {username: 1, name: 1})
  
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  note ? res.status(200).json(note) : res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFromReq(req), process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({error: 'invalid token'})
  }
  const user = await User.findById(decodedToken.id)

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
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  const {content, important} = req.body
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, {content, important},
    { new: true, runValidators: true, context: 'query' })
  res.json(updatedNote)
})

module.exports = notesRouter;