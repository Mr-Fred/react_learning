const { migrator } = require('./umzug');
const { info } = require('../middlewares/logger');

const runMigrations = async () => {
  const migrations = await migrator.up();
  info('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

module.exports = runMigrations