const Note = require('./note')
const User = require('./user')


User.hasMany(Note, {
  foreignKey: {
    allowNull: false
  }
})

Note.belongsTo(User)

Note.sync({alter: true})
User.sync({alter: true})

module.exports = {
  Note,
  User
}