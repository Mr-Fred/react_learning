import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  favoriteGenre: {
    type: String,
    default: null
  }
})

schema.plugin(mongooseUniqueValidator)

export const User = mongoose.model('User', schema)