// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const morgan = require('morgan')
// eslint-disable-next-line no-undef
const {get_phonebook, get_contact, post_contact, delete_contact} = require('./api/phonebookApi')
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

// GET REQUESTS
// app.get('/', (_request, response) => {
//   response.send('<h1>Welcome to my Phonebook app</h1>')
// })

app.get('/api/phonebook', get_phonebook)

app.get('/api/phonebook/:id', get_contact)

app.get('/info', get_info)

// POST REQUESTS
app.post('/api/phonebook', post_contact)

// DELETE REQUESTS
app.delete('/api/phonebook/:id', delete_contact)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})