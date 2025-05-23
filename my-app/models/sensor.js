const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();


class Sensor extends Model {}

Sensor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  temperature: DataTypes.FLOAT,
  humidity: DataTypes.FLOAT,
  soilMoisture: DataTypes.FLOAT,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Sensor',
  tableName: 'sensor_logs',
  timestamps: false
});

module.exports = Sensor;
