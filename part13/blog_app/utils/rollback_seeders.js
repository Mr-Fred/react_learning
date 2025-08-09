const {seeder} = require('./umzug')

const rollbackSeeders = async () => {
  try {
    await seeder.down();
    console.log('Last seeder rolled back successfully.');
  } catch (error) {
    console.error('Seeder rollback failed:', error);
    process.exit(1);
  }
};

rollbackSeeders();
