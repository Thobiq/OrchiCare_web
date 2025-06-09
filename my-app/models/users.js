const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();

class Users extends Model {}
Users.init({
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false,
});

module.exports = Users;