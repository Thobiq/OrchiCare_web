const StatusAktuator = require('../models/statusAktuator');
const PengaturanMode = require('../models/pengaturanMode');
const NilaiBatasan = require('../models/nilaiBatasan');
const mqttHandler = require('../mqtt/mqttHandler');

let currentFanState = "OFF";
let currentSprinklerState = "OFF";

class PengaturanController {
  static async showDetailNilaiBatasan(req, res) {
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

  static async showFormUbahNilaiBatasan(req, res) {
    try {
      const nilaiBatasan = await NilaiBatasan.getDataNilaiBatasan();
      if (!nilaiBatasan) {
        return res.status(404).json({ error: 'Nilai batasan not found' });
      }
      res.render('v_formUbahNilaiBatasan', { nilaiBatasan: nilaiBatasan.toJSON() });
    } catch (error) {
      console.error('Error fetching nilai batasan for form:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async updateNilaiBatasan(req, res) {
  try {
    const data = req.body;

    // Simpan ke database
    const success = await NilaiBatasan.updateDataNilaiBatasan(data);

    if (success) {
      // === Kirim MQTT setelah update berhasil ===
      const payload = {
        command: "set_parameter",
        max_temp: parseFloat(data.maxSuhuGreenhouse),
        min_temp: parseFloat(data.minSuhuGreenhouse),
        max_hum: parseFloat(data.maxKelembabanGreenhouse),
        min_hum: parseFloat(data.minKelembabanGreenhouse)
      };

      mqttHandler.publish(payload);

      res.json({
        message: 'Berhasil diubah!',
        redirect: '/pengaturan'
      });
    } else {
      res.status(400).json({
        message: 'Gagal mengubah data',
        redirect: '/pengaturan/ubah-nilai-batasan'
      });
    }
  } catch (error) {
    console.error('Error update nilai batasan:', error);
    res.status(500).json({
      message: 'Server Error',
      redirect: '/pengaturan'
    });
  }
}


  static async setMode(req, res) {
    const { mode, fan_state = "OFF", sprinkler_state = "OFF" } = req.body;

    currentFanState = fan_state;
    currentSprinklerState = sprinkler_state;

    const payload = {
      command: "set_mode",
      mode,
      fan_state: currentFanState,
      sprinkler_state: currentSprinklerState
    };

    try {
      mqttHandler.publish(payload);
      res.json({ message: `Mode ${mode} berhasil dikirim.` });
    } catch (err) {
      console.error('Gagal publish ke MQTT:', err);
      res.status(500).json({ error: 'Gagal mengatur mode sistem' });
    }
  }

  static async setFan(req, res) {
    const { fan_state } = req.body;
    currentFanState = fan_state;

    const payload = {
      command: "set_mode",
      mode: "manual",
      fan_state: currentFanState,
      sprinkler_state: currentSprinklerState
    };

    try {
      mqttHandler.publish(payload);
      res.json({ message: "Fan state updated" });
    } catch (err) {
      console.error('Gagal publish ke MQTT:', err);
      res.status(500).json({ error: 'Gagal mengirim data ke perangkat' });
    }
  }

  static async setSprinkler(req, res) {
    const { sprinkler_state } = req.body;
    currentSprinklerState = sprinkler_state;

    const payload = {
      command: "set_mode",
      mode: "manual",
      fan_state: currentFanState,
      sprinkler_state: currentSprinklerState
    };

    try {
      mqttHandler.publish(payload);
      res.json({ message: "Sprinkler state updated" });
    } catch (err) {
      console.error('Gagal publish ke MQTT:', err);
      res.status(500).json({ error: 'Gagal mengirim data ke perangkat' });
    }
  }
}

module.exports = PengaturanController;