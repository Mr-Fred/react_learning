import dotenv from 'dotenv';

dotenv.config();

const FILENAME = process.env.DATABASE_FILENAME || 'database.sqlite';

const client = 'sqlite3';
const connection = {
  filename: FILENAME,
};
const useNullAsDefault = true;

export default {
  client,
  connection,
  useNullAsDefault,
};