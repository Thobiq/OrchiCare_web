const DataMonitoring = require('../models/dataMonitoring');
const mqttHandler = require('../mqtt/mqttHandler');
const NilaiBatasan = require('../models/nilaiBatasan');
const StatusAktuator = require('../models/statusAktuator');

class DataMonitoringController {
  static async getAll(req, res) {
    try {
      const data = await DataMonitoring.find().sort({ timestamp: -1 }).limit(100);
      res.json(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static showMonitoring(req, res) {
    try {
      const data = mqttHandler.latestData; // ✅ ambil langsung dari mqttHandler
      res.render('v_monitoring', { data });
    } catch (error) {
      console.error('Error rendering monitoring view:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static showSuhuGh(req, res) {
    const { suhuGreenhouse } = mqttHandler.sensorData; // ✅
    res.json({ suhuGreenhouse });
  }

  static showKelembabanGh(req, res) {
    const { kelembabanGreenhouse } = mqttHandler.sensorData; // ✅
    res.json({ kelembabanGreenhouse });
  }

  static showKelembabanTanaman(req, res) {
    const { kelembabanTanaman } = mqttHandler.sensorData; // ✅
    res.json({ kelembabanTanaman });
  }

  static showStatusFan(req, res) {
    const fanStatus = mqttHandler.statusAktuator?.fanStatus ?? null;
    res.json({ fanStatus });
  }

  static showStatusSprinkler(req, res) {
    const sprinklerStatus = mqttHandler.statusAktuator?.sprinklerStatus ?? null;
    res.json({ sprinklerStatus });
  }


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

  static async showRiwayatMonitoring(req, res) {
    try {
      const data = await DataMonitoring.getDataMonitoringdb();
      res.render('v_riwayat_monitoring', { data });
    } catch (error) {
      console.error('Error fetching monitoring history:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Jika kamu ingin menambahkan route JSON semua data real-time:
  static getLatestData(req, res) {
    res.json(mqttHandler.latestData);
  }
}

module.exports = DataMonitoringController;
