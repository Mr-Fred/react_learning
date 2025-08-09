const { Umzug, SequelizeStorage } = require('umzug')
const { sequelize } = require('./db');

const seeder = new Umzug({
  migrations: { glob: 'seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'seeds' }), // Use a 'seeds' table
  logger: console,
});

const migrator = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }), // Use a 'migrations' table
  logger: console,
});

module.exports = { seeder, migrator };