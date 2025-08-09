'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({ context: queryInterface }, Sequelize) {
    const passwordHash = await bcrypt.hash('supersecret', 10);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        username: 'admin@blogapp.com',
        password_hash: passwordHash,
        admin: true,
        disabled: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Fred',
        username: 'fred@blogapp.com',
        password_hash: passwordHash,
        admin: false,
        disabled: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down ({ context: queryInterface }, Sequelize) {
    await queryInterface.bulkDelete('users', {
      username: [
        'admin@blogapp.com',
        'fred@blogapp.com'
      ]
    }, {});
  }
};