let sensorData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0, // kelembapan tanaman / tanah
};

const getSensorData = (req, res) => {
  res.json(sensorData);
};

const setSensorData = (data) => {
  sensorData = {
    temperature: data.temperature,
    humidity: data.humidity,
    soilMoisture: data.soilMoisture,
  };
};

module.exports = {
  getSensorData,
  setSensorData,
};
