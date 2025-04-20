const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const { insertSensorData } = require('../models/sensor');
const { setSensorData } = require('../controllers/sensorController');

let sensorData = {
  temperature: 0,
  humidity: 0,
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

  if (msg.includes('Suhu')) {
    sensorData.temperature = parseFloat(msg.replace('Suhu :', '').trim());
  } else if (msg.includes('Kelembaban')) {
    sensorData.humidity = parseFloat(msg.replace('Kelembaban :', '').trim());

    try {
      await insertSensorData(sensorData.temperature, sensorData.humidity);
      console.log('💾 Data saved to DB');
      setSensorData(sensorData);
    } catch (err) {
      console.error('❌ Error saving to DB:', err);
    }
  }
});
