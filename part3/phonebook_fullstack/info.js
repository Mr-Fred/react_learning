// eslint-disable-next-line no-undef
const persons = require('./utilities/db');

const getInfo = (req, res) => {
  req.reqTime = new Date();
  res.status(200).send(`
    Phonebook has infos ${persons.length} people </b>
    ${req.reqTime.toString()}  
  `);
};

// eslint-disable-next-line no-undef
module.exports = getInfo;
