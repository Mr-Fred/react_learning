const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  url: String,
  likes: {
    type: Number,
    default: 0,
    validate: {
      validator(v) {
        return /^\d{0,9}$/.test(v);
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
});

blogSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
