const sequelize = require('../config/database');
const Sensor = require('./sensor');

module.exports = {
  sequelize,
  Sensor,
};