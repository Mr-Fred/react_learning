// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
require('dotenv').config()
// eslint-disable-next-line no-undef
const cors = require('cors')
// eslint-disable-next-line no-undef
const Note = require('./models/note')


const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const errorHandler = (error, req, res, next) =>{
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(result => {
      console.log(result)
      response.json(result)
    })
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
  })

  newNote.save()
    .then(
      savedNote => {
        response.json(savedNote)
      }
    )
    .catch(
      error => next(error)
    )
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(
      error => next(error)
    )
})

app.delete('/api/notes/:id', (request, response, next) => {

  Note.findByIdAndDelete(request.params.id)
    .then( () =>{
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  // const note = {
  //   content: content,
  //   important: important
  // }

  Note.findByIdAndUpdate(request.params.id, {content, important},
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})