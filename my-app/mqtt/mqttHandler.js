const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const { insertSensorData } = require('../models/sensor');
const { setSensorData } = require('../controllers/sensorController');

let sensorData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0
};

const mqttClient = mqtt.connect(mqttConfig.host, {
  username: mqttConfig.username,
  password: mqttConfig.password,
});

mqttClient.on('connect', () => {
  console.log('✅ Connected to MQTT Broker');
  mqttClient.subscribe(mqttConfig.topic, (err) => {
    if (err) console.error('❌ Subscribe failed:', err);
    else console.log(`✅ Subscribed to topic: ${mqttConfig.topic}`);
  });
});

mqttClient.on('message', async (topic, message) => {
  const msg = message.toString();
  console.log('📩 Message:', msg);
  var data = JSON.parse(msg);
  console.log(data["kelembaban-gh"]);
  console.log(data["fan-status"]);

  sensorData.temperature = data["suhu"];
  sensorData.humidity = data["kelembaban-gh"];
  sensorData.soilMoisture = data["kelembaban-mt"];
  // Update frontend data terlebih dahulu
  setSensorData(sensorData);

  // Simpan ke database jika data lengkap
  if (sensorData.temperature && sensorData.humidity) {
    try {
      await insertSensorData(sensorData.temperature, sensorData.humidity);
      console.log('💾 Data saved to DB');
    } catch (err) {
      console.warn('⚠️ DB Error, data not saved:', err.message);
    }
  }
});