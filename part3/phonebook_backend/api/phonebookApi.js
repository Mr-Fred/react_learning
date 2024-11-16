// eslint-disable-next-line no-undef
const Contact = require('../models/phonebook')
// eslint-disable-next-line no-undef


const get_phonebook = (request, response) => {
  Contact.find({})
    .then( contacts => {
      response.json(contacts)
    })
}

const get_contact = (request, response, next) => {
  Contact.findById(request.params.id)
    .then( contact => {
      if(contact){
        response.json(contact)
      } else {
        response.status(404).end()
      }
    }) 
    .catch( error => next(error))
}

const post_contact = (request, response) => {
  const body = request.body

  if(typeof(body.number) === 'string'){
    body.number = Number(body.number.replace(/\D/g,""))
  }
  
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name and/or number is required"
    })
  }
  
  Contact.findOne({$or: [{name: body.name}, {number: body.number}]})
    .then(contact => {
      if(contact){
        return response.status(400).json({
          error: "name or number already exists"
        })
      } else { 
        const newContact = new Contact({
          name: body.name,
          number: body.number
        })
        return newContact.save();
      }
    })
    .then( savedContact => {
      response.json(savedContact)
    })
}

const delete_contact = (request, response, next) => {
  const id = request.params.id
  Contact.deleteOne({_id: id})
    .then( () =>{
      response.status(204).end()
    })
    .catch(error => next(error))
}

const update_contact = (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const contact = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(id, contact, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
}

// eslint-disable-next-line no-undef
module.exports = {get_phonebook,
  get_contact,
  post_contact,
  delete_contact,
  update_contact
}