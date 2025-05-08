let sensorData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0,
  fanStatus: '--',
  sprinklerStatus: '--'

};

const setSensorData = (data) => {
  sensorData = {
    temperature: data.temperature,
    humidity: data.humidity,
    soilMoisture: data.soilMoisture,
    fanStatus: data.fanStatus,
    sprinklerStatus: data.sprinklerStatus
  };
};

const getSensorData = (req, res) => {
  res.json(sensorData);
};

module.exports = {
  getSensorData,
  setSensorData,
};
