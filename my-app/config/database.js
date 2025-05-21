// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    this._sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
      }
    );

    this._connect();
  }

  async _connect() {
    try {
      await this._sequelize.authenticate();
      console.log('✅ Database connected using Sequelize.');
    } catch (error) {
      console.error('❌ Failed to connect to DB:', error.message);
    }
  }

  getSequelizeInstance() {
    return this._sequelize;
  }
}

module.exports = new Database();
