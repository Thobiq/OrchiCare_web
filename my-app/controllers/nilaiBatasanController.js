const mqttHandler = require('../mqtt/mqttHandler');
const NilaiBatasan = require('../models/nilaiBatasan');

class NilaiBatasanController {

  static async showNilaiBatasan(req, res) {
  try {
    const nilaiBatasan = await NilaiBatasan.getDataNilaiBatasan();
    if (!nilaiBatasan) {
      return res.status(404).json({ error: 'Nilai batasan not found' });
    }
    res.json(nilaiBatasan.toJSON());
  } catch (error) {
    console.error('Error fetching nilai batasan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


}
module.exports = NilaiBatasanController;