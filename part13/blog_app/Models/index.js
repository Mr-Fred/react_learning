const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
  foreignKey: { name: 'userId' }
});
Blog.belongsTo(User);


module.exports = {
  Blog,
  User
};