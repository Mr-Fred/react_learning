const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
  foreignKey: { name: 'userId' }
});
Blog.belongsTo(User);

// Sync all models at once. Sequelize will automatically create tables in the correct order.
User.sequelize.sync({ alter: true });

module.exports = {
  Blog,
  User
};