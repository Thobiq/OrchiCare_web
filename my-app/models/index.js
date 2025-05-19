const sequelize = require('../config/database');
const Sensor = require('./sensor');
const NilaiBatasan = require('./nilaiBatasan');
const Pengaturan = require('./pengaturan');
const PengaturanMode = require('./pengaturanMode');


module.exports = {
  sequelize,
  Sensor,
  NilaiBatasan,
  Pengaturan,
  PengaturanMode,
};
