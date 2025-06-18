const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const DataMonitoring = require('../models/dataMonitoring'); 

class MqttHandler {
  constructor() {
    this.client = null;

    this.temperatureBuffer = [];
    this.humidityBuffer = [];
    this.soilMoistureBuffer = [];
    this.sensorData = {
      suhuGreenhouse: 0,
      kelembabanGreenhouse: 0,
      kelembabanTanaman: 0,
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

    // Gunakan subscribeTopic yang benar dari mqttConfig
    this.client.subscribe(mqttConfig.subscribeTopic, (err) => {
      if (err) {
        console.error('❌ MQTT subscribe error:', err.message);
      } else {
        console.log(`📡 Subscribed to topic: ${mqttConfig.subscribeTopic}`);
        
      }
    });
  });

  // Menangani pesan masuk
  this.client.on('message', (topic, message) => {
    try {
      const data = JSON.parse(message.toString());
      this.handleDataMonitoring(data);
      this.handleDataStatusAktuator(data);
    } catch (err) {
      console.error('❌ Failed to handle MQTT message:', err.message);
    }
  });

  // Tambahkan handler error untuk debugging lebih baik
  this.client.on('error', (err) => {
    console.error('❌ MQTT connection error:', err.message);
  });

  this.client.on('close', () => {
    console.warn('⚠️ MQTT connection closed');
  });
}

  handleDataStatusAktuator(data){
    const {fanStatus, sprinklerStatus} = data;
    this.statusAktuator = {
      fanStatus: fanStatus,
      sprinklerStatus: sprinklerStatus,
    };
    console.log(`Fan Status: ${fanStatus}, Sprinkler Status: ${sprinklerStatus}`);
  }

  handleDataMonitoring(data) {
    const { suhu, kelembaban_gh, kelembaban_mt } = data;

    this.temperatureBuffer.push(suhu);
    this.humidityBuffer.push(kelembaban_gh);
    this.soilMoistureBuffer.push(kelembaban_mt);

    this.sensorData = {
      suhuGreenhouse: suhu,
      kelembabanGreenhouse: kelembaban_gh,
      kelembabanTanaman: kelembaban_mt,
    };
    console.log(`📊 Received data - Temp: ${suhu}, Humidity: ${kelembaban_gh}, Soil Moisture: ${kelembaban_mt}`);
    console.log(`Latest Data: ${JSON.stringify(this.sensorData)}`);
    
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
        kelembabanGreenhouse: avgHumidity,
        kelembabanTanaman: avgSoil,
      });

      console.log(`💾 Saved average: Temp=${avgTemp}, Hum=${avgHumidity}, Soil=${avgSoil}`);
    } catch (error) {
      console.error('❌ Failed to save averaged data:', error.message);
    }

    
    this.temperatureBuffer = [];
    this.humidityBuffer = [];
    this.soilMoistureBuffer = [];
  }

  publish(message) {
    if (this.client && this.client.connected) {
      const payload = typeof message === 'object' ? JSON.stringify(message) : String(message);
      this.client.publish(mqttConfig.publishTopic, payload, (err) => {
        if (err) {
          console.error('❌ MQTT publish error:', err.message);
        } else {
          console.log(`📤 Published to ${mqttConfig.publishTopic}:`, payload);
        }
      });
    } else {
      console.warn('⚠️ MQTT client not connected. Cannot publish message.');
    }
  }

}

module.exports = new MqttHandler();