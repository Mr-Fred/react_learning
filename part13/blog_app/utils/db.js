const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');
const { info, error } = require('../middlewares/logger');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    const runMigrations = require('./run_migration');
    await runMigrations();
    info('database connected');
  } catch (err) {
    error('failed to connect to the database:', err);
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize };