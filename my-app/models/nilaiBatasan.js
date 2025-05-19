const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class NilaiBatasan extends Model {}
NilaiBatasan.init({
  id_nilai_batasan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  max_suhu_greenhouse: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  min_suhu_greenhouse: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
   max_kelembaban_greenhouse: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
   min_kelembaban_greenhouse: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
   max_kelembaban_tanaman: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
   min_kelembaban_tanaman: {
    type: DataTypes.FLOAT,
    allowNull: false,
   }
}, {
  sequelize,
  modelName: 'NilaiBatasan',
  tableName: 'nilai_batasan',
  timestamps: false,
});