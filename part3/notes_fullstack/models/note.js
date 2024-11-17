// eslint-disable-next-line no-undef
const mongoose = require('mongoose')
// eslint-disable-next-line no-undef
require('dotenv').config()

mongoose.set('strictQuery',false)

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;
console.log('connecting to Database')

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Note', noteSchema)
