const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const sequelize = db.getSequelizeInstance();
const DataMonitoring = require('./dataMonitoring');
const NilaiBatasan = require('./nilaiBatasan');
const PengaturanMode = require('./pengaturanMode'); 
const StatusAktuator = require('./statusAktuator');
const Users = require('./users');

module.exports = {
    DataMonitoring: DataMonitoring,
    NilaiBatasan: NilaiBatasan,
    PengaturanMode: PengaturanMode,
    StatusAktuator: StatusAktuator,
    Users: Users,
    sequelize: sequelize
}