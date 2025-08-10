const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {
  // This is more efficient as it performs a COUNT query
  // instead of fetching all notes.
  async number_of_notes() {
    return await this.countNotes()
  }

  static async with_notes(limit) {
    // Ensure the limit is a valid integer to prevent SQL injection.
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit)) {
      throw new Error('Invalid limit provided. Must be a number.');
    }

    return await User.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("notes.id")), "note_count"]]
      },
      include: {
        model: Note,
        attributes: [] // Optimization: only needed for the join/count
      },
      group: ['user.id'],
      // Use Sequelize's built-in `where` on `fn` for safe parameter binding
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('notes.id')), '>', parsedLimit)
    })
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  defaultScope: {
    where: {
      disabled: false
    }
  },
  scopes: {
    admin: {
      where: {
        admin: true
      }
    },
    disabled: {
      where: {
        disabled: true
      }
    },
    name(value){
      return {
        where: {
          name: {
            [Op.iLike]: `%${value}%`
          }
        }
      }
    }
  }
})

module.exports = User