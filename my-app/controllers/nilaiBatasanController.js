const batasanService = require('../services/nilaiBatasanService');
const mqttHandler = require('../mqtt/mqttHandler');

exports.updateLimits = async (req, res) => {
  const {
    minTemp, maxTemp,
    minHum, maxHum,
    minPlantHum, maxPlantHum
  } = req.body; 

  const configData = {
    suhu: { min: minTemp, max: maxTemp },
    kelembapan: { min: minHum, max: maxHum },
    kelembapanTanaman: { min: minPlantHum, max: maxPlantHum }
  };

  try {
    await batasanService.saveLimits(configData); 
    mqttHandler.publish('config/limits', configData); 

    res.json({ message: 'Batasan berhasil diperbarui dan dikirim ke IoT.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memperbarui batasan.' });
  }
};