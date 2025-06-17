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
  namaMode: {
    type: DataTypes.STRING,
    field: 'nama_mode',
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PengaturanMode',
  tableName: 'pengaturan_mode',
  timestamps: false,
});

PengaturanMode.DataModeManual = async function () {
  return await this.findOne({
    where: { id_pengaturan_mode: 2 },
  });
}
PengaturanMode.DataModeOtomatis = async function () {
  return await this.findOne({
    where: { id_pengaturan_mode: 1 },
  });
}


module.exports = PengaturanMode;
