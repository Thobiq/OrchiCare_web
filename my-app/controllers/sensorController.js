// ---------- controllers/sensorController.js ----------
const { Sensor } = require('../models');

const sensorController = {
  async storeSensorData(data) {
    const { suhu, kelembaban } = data;
    if (suhu != null && kelembaban != null) {
      await Sensor.create({ suhu, kelembaban });
      console.log('Data sensor disimpan:', data);
    }
  },

  async getAllSensorData(req, res) {
    const data = await Sensor.findAll({ order: [['createdAt', 'DESC']] });
    res.render('index', { data });
  }
};

module.exports = sensorController;