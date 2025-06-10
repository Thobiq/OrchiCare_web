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

PengaturanMode.getDataMode = async function () {
  return await this.findAll({
    order: [['id_pengaturan_mode', 'DESC']],
  });
}

module.exports = PengaturanMode;
