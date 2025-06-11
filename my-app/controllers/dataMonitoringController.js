const DataMonitoring = require('../models/dataMonitoring');
const mqttHandler = require('../mqtt/mqttHandler');
const NilaiBatasan = require('../models/nilaiBatasan');
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
      const data = DataMonitoring.getDataMonitoring();
      res.render('v_monitoring', { data });
    } catch (error) {
      console.error('Error rendering monitoring view:', error);
      res.status(500).send('Internal Server Error');
    }
  }

   static showSuhuGh(req, res) {
    const { suhuGreenhouse } = mqttHandler.getDataMonitoring();
    res.json({ suhuGreenhouse });
  }

  static showKelembabanGh(req, res) {
    const { kelembabanGreenhouse } = mqttHandler.getDataMonitoring();
    res.json({ kelembabanGreenhouse });
  }

  static showKelembabanTanaman(req, res) {
    const { kelembabanTanaman } = mqttHandler.getDataMonitoring();
    res.json({ kelembabanTanaman });
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


  // static async getLatest(req, res) {
  //   try {
  //     const data = DataMonitoring.getDataMonitoring(); 
  //     res.json(data);
  //   } catch (err) {
  //     console.error('Failed to get latest:', err);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
}





module.exports = DataMonitoringController;