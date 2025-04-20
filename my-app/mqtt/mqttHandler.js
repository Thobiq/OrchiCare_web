// ---------- mqtt/mqttHandler.js ----------
const client = require('../config/mqtt');
const sensorController = require('../controllers/sensorController');

client.on('connect', () => {
  console.log('Terhubung ke MQTT Broker');
  client.subscribe('sensor/data');
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    await sensorController.storeSensorData(payload);
  } catch (err) {
    console.error('Gagal parsing atau menyimpan data MQTT:', err);
  }
});