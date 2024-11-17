// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const morgan = require('morgan');

const cors = require('cors');
const {
  getPhonebook,
  getContact,
  postContact,
  deleteContact,
  updateContact,
} = require('./api/phonebookApi');
// eslint-disable-next-line no-undef
const getInfo = require('./info');
// eslint-disable-next-line no-undef

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.get('/api/phonebook', getPhonebook);

app.get('/api/phonebook/:id', getContact);

app.get('/info', getInfo);

// POST REQUESTS
app.post('/api/phonebook', postContact);

// UPDATE REQUESTS
app.put('/api/phonebook/:id', updateContact);

// DELETE REQUESTS
app.delete('/api/phonebook/:id', deleteContact);

app.use(errorHandler);

// eslint-disable-next-line no-undef
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
