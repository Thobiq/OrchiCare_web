const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const mqtt = require('../config/mqtt');
const sequelize = db.getSequelizeInstance();
const mqttHandler = require('../mqtt/mqttHandler'); 

class DataMonitoring extends Model {}

DataMonitoring.init({
  id_monitoring: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  suhuGreenhouse: {
    type: DataTypes.FLOAT,
    field: 'data_suhu_greenhouse',
    allowNull: false,
  },
  kelembapanGreenhouse: {
    type: DataTypes.FLOAT,
    field: 'data_kelembaban_greenhouse',
    allowNull: false,
  },
  kelembapanTanaman: {
    type: DataTypes.FLOAT,
    field: 'data_kelembaban_tanaman',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdat',
    defaultValue: DataTypes.NOW,
  }
},{
  sequelize,
  modelName: 'DataMonitoring',
  tableName: 'data_monitoring',
  underscored: true,
  timestamps: false
});

DataMonitoring.getDataMonitoring = function () {
  return mqttHandler.latestData();
};

DataMonitoring.getDataMonitoringdb = async function () {
  return await this.findAll({
    order: [['createdAt', 'DESC']],
  });
};



DataMonitoring.deleteDataMonitoring = async function (id) {
  const deleted = await this.destroy({
    where: { id_monitoring: id }
  });
  return deleted > 0; 
};

DataMonitoring.insertData = async function (data) {
  return await this.create(data);
};

module.exports = DataMonitoring;
