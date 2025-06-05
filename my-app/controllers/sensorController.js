class SensorController {
  constructor() {
    this.sensorData = {
      temperature: 0,
      humidity: 0,
      soilMoisture: 0,
      fanStatus: '--',
      sprinklerStatus: '--',
    };

    this.getSensorData = this.getSensorData.bind(this);
  }

  setSensorData(data) {
    this.sensorData = {
      temperature: data.temperature,
      humidity: data.humidity,
      soilMoisture: data.soilMoisture,
      fanStatus: data.fanStatus,
      sprinklerStatus: data.sprinklerStatus,
    };
  }

  getSensorData(req, res) {
    res.json(this.sensorData);
  }
}

module.exports = new SensorController();