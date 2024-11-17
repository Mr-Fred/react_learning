// eslint-disable-next-line no-undef
require('dotenv').config()

// eslint-disable-next-line no-undef
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('Connecting to database')

mongoose.connect(url)
  .then( () => {
    console.log('Connected to database')
  })
  .catch( (error) => {
    console.log('Error connecting to database', error.message)
  }
  )

const contactSchema = mongoose.Schema({
  name: String,
  number: Number
})

contactSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Contact', contactSchema)