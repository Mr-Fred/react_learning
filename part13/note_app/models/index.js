const Note = require('./note')
const User = require('./user')
const Team = require('./teams');
const Membership = require('./membership');
const UserNotes = require('./user_notes')


User.hasMany(Note, {
  foreignKey: {
    allowNull: false
  }
})

Note.belongsTo(User)
User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, {through: UserNotes, as: 'marked_notes'})
Note.belongsToMany(User, {through: UserNotes, as: 'marked_by_users'})

module.exports = {
  Note,
  User,
  Team,
  Membership
}