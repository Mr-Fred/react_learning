const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const bcrypt = require('bcrypt');

/**
 * Hashes the user's password if it has been changed.
 * This function is used as a hook before creating or updating a user.
 * @param {User} user - The user instance.
 */
const hashPasswordHook = async (user) => {
  if (user.changed('passwordHash')) {
    const saltRounds = 10;
    user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
  }
};

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255]
    }
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  hooks: {
    beforeCreate: hashPasswordHook,
    beforeUpdate: hashPasswordHook
  },
  underscored: true,
  modelName: 'user'
});

module.exports = User;
