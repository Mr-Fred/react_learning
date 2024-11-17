// eslint-disable-next-line no-undef
require('dotenv').config();

// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log('Connecting to database');

mongoose.connect(url)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database', error.message);
  });

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3,4}-\d{3}-\d{4}/.test(v) || /\d{3,4} \d{3} \d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!\nValid format: 000-0000000`,
    },
    required: [true, 'User phone number required'],
  },
});

contactSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Contact', contactSchema);
