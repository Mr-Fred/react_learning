require('dotenv').config()

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_t5dbzMInQvpSyKPKVdrwf';
const SESSION_SECRET = process.env.SESSION_SECRET || 'default_session_secret';


module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  SESSION_SECRET
};
