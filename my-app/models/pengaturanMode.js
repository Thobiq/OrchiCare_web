const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();


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
