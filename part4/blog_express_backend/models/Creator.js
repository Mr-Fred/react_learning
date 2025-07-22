const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    unique: true,
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
});

creatorSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

module.exports = mongoose.model('Creator', creatorSchema);
