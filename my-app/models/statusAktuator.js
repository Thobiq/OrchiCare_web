const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();

class StatusAktuator extends Model {}
StatusAktuator.init({
  id_status_aktuator: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  namaAktuator: {
    type: DataTypes.STRING,
    field: 'nama_aktuator',
    allowNull: false,
  },
  statusAktuator: {
    type: DataTypes.BOOLEAN,
    field: 'status_aktuator',
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'StatusAktuator',
  tableName: 'status_aktuator',
  timestamps: false,
}); 

StatusAktuator.getDataStatusKipasOn = async function () {
  return await this.findOne({
    where: { id_status: 1 },
  });
}
StatusAktuator.getDataStatusKipasOff = async function () {
  return await this.findOne({
    where: { id_status: 2 },
  });
}
StatusAktuator.getDataStatusPompaOn = async function () {
  return await this.findOne({
    where: { id_status: 3 },
  });
}
StatusAktuator.getDataStatusPompaOff = async function () {
  return await this.findOne({
    where: { id_status: 4 },
  });
}

StatusAktuator.updateStatusAktuator = async function (id, data) {
  const [updated] = await this.update(data, {
    where: { id_status_aktuator: id }
  });
  return updated > 0; 
}

module.exports = StatusAktuator;
