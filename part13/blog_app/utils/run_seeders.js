const {error, info} = require('../middlewares/logger');
const {seeder} = require('./umzug')

const runSeeders = async () => {
  try {
    await seeder.up();
    info('Seeders executed successfully.');
  } catch (err) {
    error('Seeder failed to run:', err);
    process.exit(1);
  }
};

runSeeders();