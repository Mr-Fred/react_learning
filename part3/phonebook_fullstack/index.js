// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const morgan = require('morgan')

const {get_phonebook, 
  get_contact, 
  post_contact, 
  delete_contact,
  // eslint-disable-next-line no-undef
  update_contact,} = require('./api/phonebookApi')
// eslint-disable-next-line no-undef
const get_info = require('./info')
// eslint-disable-next-line no-undef
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// eslint-disable-next-line no-unused-vars
morgan.token('body', function(req, res) {
  return JSON.stringify(req.body)
} )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, req, res, next) =>{
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/api/phonebook', get_phonebook)

app.get('/api/phonebook/:id', get_contact)

app.get('/info', get_info)

// POST REQUESTS
app.post('/api/phonebook', post_contact)

// UPDATE REQUESTS
app.put('/api/phonebook/:id', update_contact)

// DELETE REQUESTS
app.delete('/api/phonebook/:id', delete_contact)

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})