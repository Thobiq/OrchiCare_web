const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const { insertSensorData } = require('../models/sensor');
const { setSensorData } = require('../controllers/sensorController');

let sensorData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0
};


let temperatureBuffer = [];
let humidityBuffer = [];
let soilMoistureBuffer = [];

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
  var data = JSON.parse(msg);

  sensorData.temperature = data["suhu"];
  sensorData.humidity = data["kelembaban-gh"];
  sensorData.soilMoisture = data["kelembaban-mt"];

  setSensorData(sensorData);


  if (sensorData.temperature && sensorData.humidity) {
    temperatureBuffer.push(sensorData.temperature);
    humidityBuffer.push(sensorData.humidity);
    soilMoistureBuffer.push(sensorData.soilMoisture);
  }
});

setInterval(async () => {
  if (temperatureBuffer.length > 0) {

    const avgTemp = average(temperatureBuffer);
    const avgHumidity = average(humidityBuffer);
    const avgSoil = average(soilMoistureBuffer);

    try {
      await insertSensorData(avgTemp, avgHumidity, avgSoil);  // Sesuaikan dengan function di models/sensor.js
      console.log(`💾 [${new Date().toISOString()}] Averaged data saved: Temp=${avgTemp}, Humidity=${avgHumidity}`);
    } catch (err) {
      console.warn('⚠️ Failed to save averaged data:', err.message);
    }


    temperatureBuffer = [];
    humidityBuffer = [];
    soilMoistureBuffer = [];
  }
}, 600000); 


function average(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}