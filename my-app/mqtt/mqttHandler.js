const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt');
const sensorService = require('../services/sensorService');

class MqttHandler {
  constructor() {
    this.client = null;
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

    this.client.on('message', async (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        await sensorService.handleData(data);
      } catch (err) {
        console.error('❌ Failed to handle MQTT message:', err.message);
      }
    });
  }
}

module.exports = new MqttHandler();
