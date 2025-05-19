const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PengaturanMode = require('./pengaturanMode');

class Pengaturan extends Model {}

Pengaturan.init({
  id_pengaturan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pengaturan_mode: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pengaturan_mode',
      key: 'id_pengaturan_mode',
    }
  },
}, {
  sequelize,
  modelName: 'Pengaturan',
  tableName: 'pengaturan',
  timestamps: false,
});

Pengaturan.belongsTo(PengaturanMode, {
  foreignKey: 'id_pengaturan_mode',
  as: 'mode'
});
PengaturanMode.hasMany(Pengaturan, {
  foreignKey: 'id_pengaturan_mode',
  as: 'pengaturanList'
});

module.exports = Pengaturan;
