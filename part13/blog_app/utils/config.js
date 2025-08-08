require('dotenv').config()

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_t5dbzMInQvpSyKPKVdrwf';

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET
};
