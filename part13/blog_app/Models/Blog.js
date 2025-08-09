const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1991],
        msg: 'Year must be 1991 or later.'
      },
      isNotFuture(value) {
        const currentYear = new Date().getFullYear();
        if (parseInt(value) > currentYear) {
          throw new Error(`Year cannot be in the future. Maximum allowed year is ${currentYear}.`);
        }
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
});

module.exports = Blog;
