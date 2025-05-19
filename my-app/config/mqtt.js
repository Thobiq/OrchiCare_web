class MqttConfig {
  constructor() {
    this.host = 'mqtt://broker.tbqproject.my.id';
    this.topic = 'tbq/broker';
    this.username = 'tbqmqtt';
    this.password = 'tbq2412';
  }

  getConfig() {
    return {
      host: this.host,
      topic: this.topic,
      username: this.username,
      password: this.password,
    };
  }
}

module.exports = new MqttConfig();
