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
  content: String,
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

// function fetchAllNotes(){
//   try {
//     Note.find({}).then(result => {
//       console.log(result)
//       mongoose.connection.close()
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function saveNote(){
//   // eslint-disable-next-line no-unused-vars
//   const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })
 
//   const result = await note.save();
//   console.log(result)
//   await mongoose.connection.close()
// }

// // eslint-disable-next-line no-undef
// module.exports = {
//   fetchAllNotes,
//   saveNote
// }


