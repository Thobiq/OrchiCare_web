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
  max_kelembaban_greenhouse: {
   type: DataTypes.FLOAT,
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
  return await this.findAll({
    order: [['id_nilai_batasan', 'DESC']],
  });
}
NilaiBatasan.insertDataNilaiBatasan = async function (data) {
  return await this.create(data);
}

NilaiBatasan.updateDataNilaiBatasan = async function (id, data) {
  const [updated] = await this.update(data, {
    where: { id_nilai_batasan: 1 }
  });
  return updated > 0;
}
module.exports = NilaiBatasan;