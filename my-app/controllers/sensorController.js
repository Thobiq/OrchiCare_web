let sensorData = {
  temperature: 0,
  humidity: 0,
};

const getSensorData = (req, res) => {
  res.json(sensorData);
};

const setSensorData = (data) => {
  sensorData = data;
};

module.exports = {
  getSensorData,
  setSensorData,
};
