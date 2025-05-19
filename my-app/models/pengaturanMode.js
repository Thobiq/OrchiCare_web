const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PengaturanMode extends Model {}

PengaturanMode.init({
  id_pengaturan_mode: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_mode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PengaturanMode',
  tableName: 'pengaturan_mode',
  timestamps: false,
});

module.exports = PengaturanMode;
