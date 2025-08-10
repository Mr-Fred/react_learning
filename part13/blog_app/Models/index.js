const Blog = require('./Blog');
const User = require('./User');
const ReadingList = require('./ReadingList');

User.hasMany(Blog, {
  foreignKey: { name: 'userId' }
});
Blog.belongsTo(User);
User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'readings' // This alias will be used in queries
});
Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'users_reading'
});

module.exports = {
  Blog,
  User,
  ReadingList,
};