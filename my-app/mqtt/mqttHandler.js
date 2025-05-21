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
