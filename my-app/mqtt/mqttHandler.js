const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const DataMonitoring = require('../models/dataMonitoring'); 

class MqttHandler {
  constructor() {
    this.client = null;

    this.temperatureBuffer = [];
    this.humidityBuffer = [];
    this.soilMoistureBuffer = [];
    this.latestData = {
      suhuGreenhouse: 0,
      kelembapanGreenhouse: 0,
      kelembapanTanaman: 0,
    };

    setInterval(this.saveAveragedData.bind(this), 10 * 60 * 1000);
  }

  connect() {
    this.client = mqtt.connect(mqttConfig.host, {
      username: mqttConfig.username,
      password: mqttConfig.password,
    });

    this.client.on('connect', () => {
      console.log('✅ Connected to MQTT broker');
      this.client.subscribe(mqttConfig.topic, (err) => {
        if (err) {
          console.error('❌ MQTT subscribe error:', err);
        } else {
          console.log(`📡 Subscribed to topic: ${mqttConfig.topic}`);
        }
      });
    });

    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        this.handleIncomingData(data);
      } catch (err) {
        console.error('❌ Failed to handle MQTT message:', err.message);
      }
    });
  }

  handleIncomingData(data) {
    const { temperature, humidity, soilMoisture } = data;

    this.temperatureBuffer.push(temperature);
    this.humidityBuffer.push(humidity);
    this.soilMoistureBuffer.push(soilMoisture);

    this.latestData = {
      suhuGreenhouse: temperature,
      kelembapanGreenhouse: humidity,
      kelembapanTanaman: soilMoisture,
    };
  }

  average(array) {
    if (!array.length) return 0;
    return array.reduce((a, b) => a + b, 0) / array.length;
  }

  async saveAveragedData() {
    if (
      this.temperatureBuffer.length === 0 ||
      this.humidityBuffer.length === 0 ||
      this.soilMoistureBuffer.length === 0
    ) {
      return; 
    }

    const avgTemp = this.average(this.temperatureBuffer);
    const avgHumidity = this.average(this.humidityBuffer);
    const avgSoil = this.average(this.soilMoistureBuffer);

    try {
      await DataMonitoring.insertData({
        suhuGreenhouse: avgTemp,
        kelembapanGreenhouse: avgHumidity,
        kelembapanTanaman: avgSoil,
      });

      console.log(`💾 Saved average: Temp=${avgTemp}, Hum=${avgHumidity}, Soil=${avgSoil}`);
    } catch (error) {
      console.error('❌ Failed to save averaged data:', error.message);
    }

    
    this.temperatureBuffer = [];
    this.humidityBuffer = [];
    this.soilMoistureBuffer = [];
  }

  publish(topic, message) {
    if (this.client && this.client.connected) {
      const payload = typeof message === 'object' ? JSON.stringify(message) : String(message);
      this.client.publish(topic, payload, (err) => {
        if (err) {
          console.error('❌ MQTT publish error:', err.message);
        } else {
          console.log(`📤 Published to ${topic}:`, payload);
        }
      });
    } else {
      console.warn('⚠️ MQTT client not connected. Cannot publish message.');
    }
  }
}

module.exports = new MqttHandler();