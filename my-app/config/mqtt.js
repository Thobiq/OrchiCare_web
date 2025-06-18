class MqttConfig {
  constructor() {
    this.host = 'mqtt://broker.tbqproject.my.id';
    this.username = 'tbqmqtt';
    this.password = 'tbq2412';

    this.subscribeTopic = 'tbq/broker';
    this.publishTopic = 'tbq/broker/command';
  }

  getConfig() {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
      subscribeTopic: this.subscribeTopic,
      publishTopic: this.publishTopic,
    };
  }
}

module.exports = new MqttConfig();
