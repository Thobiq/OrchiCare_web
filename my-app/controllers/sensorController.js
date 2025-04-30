let sensorData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0, // kelembapan tanaman / tanah
};



const setSensorData = (data) => {
  sensorData = {
    temperature: data.temperature,
    humidity: data.humidity,
    soilMoisture: data.soilMoisture,
  };
};

const getSensorData = (req, res) => {
  res.json(sensorData);
};

module.exports = {
  getSensorData,
  setSensorData,
};
