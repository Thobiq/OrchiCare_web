const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();

class NilaiBatasan extends Model {}
NilaiBatasan.init({
  id_nilai_batasan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  maxSuhuGreenhouse: {
    type: DataTypes.FLOAT,
    field: 'max_suhu_greenhouse',
    allowNull: false,
  },
  maxKelembabanGreenhouse: {
   type: DataTypes.FLOAT,
   field: 'max_kelembaban_greenhouse',
   allowNull: false,
 },
 maxKelembabanTanaman: {
  type: DataTypes.FLOAT,
  field: 'max_kelembaban_tanaman',
  allowNull: false,
},
  minSuhuGreenhouse: {
    type: DataTypes.FLOAT,
    field: 'min_suhu_greenhouse',
    allowNull: false,
  },
   minKelembabanGreenhouse: {
    type: DataTypes.FLOAT,
    field: 'min_kelembaban_greenhouse',
    allowNull: false,
  },
   minKelembabanTanaman: {
    type: DataTypes.FLOAT,
    field: 'min_kelembaban_tanaman',
    allowNull: false,
   }
}, {
  sequelize,
  modelName: 'NilaiBatasan',
  tableName: 'nilai_batasan',
  timestamps: false,
});

NilaiBatasan.getDataNilaiBatasan = async function () {
  return await this.findOne({
    where: { id_nilai_batasan: 1 }
  });
}
NilaiBatasan.insertDataNilaiBatasan = async function (data) {
  return await this.create(data);
}

NilaiBatasan.updateDataNilaiBatasan = async function (data) {
  console.log('Data diterima oleh model:', data);
  const [updated] = await this.update(data, {
    where: { id_nilai_batasan: 1 }
  });
  return updated > 0;
}
module.exports = NilaiBatasan;