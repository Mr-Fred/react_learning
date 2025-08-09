const {migrator} = require('./umzug')
const {info, error} = require('../middlewares/logger')

const rollbackMigration = async () => {
  try {
    await migrator.down();
    info('Last migration rolled back successfully.');
  } catch (err) {
    error('Rollback failed:', err);
    process.exit(1);
  }
};

rollbackMigration();