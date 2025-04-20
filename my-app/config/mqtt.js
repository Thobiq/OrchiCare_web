// ---------- config/mqtt.js ----------
const mqtt = require('mqtt');
require('dotenv').config();

const client = mqtt.connect(process.env.MQTT_BROKER_URL);
module.exports = client;