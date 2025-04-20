// ---------- models/sensor.js ----------
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define('Sensor', {
  suhu: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  kelembaban: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Sensor;