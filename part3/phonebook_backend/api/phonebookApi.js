// eslint-disable-next-line no-undef
let contacts = require('../utilities/db')
// eslint-disable-next-line no-undef
const generateId = require('../utilities/utils')

const get_phonebook = (request, response) => {
  response.json(contacts)
}

const get_contact = (request, response) => {
  const id = request.params.id
  const contact = contacts.find(contact => contact.id === id)
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).send({
      error: `Contact with id ${id} doesn't exist in the Phonebook`
    })
  }
}

const post_contact = (request, response) => {
  const body = request.body
  
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name and/or number is required"
    })
  }
  const nameExist = contacts.some(contact => contact.name === body.name)
  if (nameExist) {
    return response.status(400).json({
      error: "Name must be unique"
    })
  }

  const contact = {
    content: body.name,
    number: Number(body.number),
    id: generateId(contacts),
  } 
  contacts = contacts.concat(contact)
  response.json(contact)
}

const delete_contact = (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
}

// eslint-disable-next-line no-undef
module.exports = {get_phonebook,
  get_contact,
  post_contact,
  delete_contact,
  
}