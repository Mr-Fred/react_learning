// eslint-disable-next-line no-undef
const Contact = require('../models/phonebook');
// eslint-disable-next-line no-undef

const getPhonebook = (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      response.json(contacts);
    })
    .catch((error) => next(error));
};

const getContact = (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

const postContact = (request, response, next) => {
  const { body } = request;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number is required',
    });
  }

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });

  newContact.save()
    .then((savedContact) => {
      response.json(savedContact);
    })
    .catch((error) => next(error));
};

const deleteContact = (request, response, next) => {
  const { id } = request.params;
  Contact.deleteOne({ _id: id })
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
};

const updateContact = (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  const contact = {
    name: body.name,
    number: body.number,
  };
  Contact.findByIdAndUpdate(id, contact, { new: true, runValidators: true, context: 'query' })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
};

// eslint-disable-next-line no-undef
module.exports = {
  getPhonebook,
  getContact,
  postContact,
  deleteContact,
  updateContact,
};
