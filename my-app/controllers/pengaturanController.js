const StatusAktuator = require('../models/statusAktuator');
const PengaturanMode = require('../models/pengaturanMode');
const NilaiBatasan = require('../models/nilaiBatasan');

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
    const success = await NilaiBatasan.updateDataNilaiBatasan(data);

    if (success) {
      res.json({ 
        message: 'Berhasil diubah!',
        redirect: '/pengaturan' // Pastikan ini ada
      });
    } else {
      res.status(400).json({ 
        message: 'Gagal mengubah data',
        redirect: '/pengaturan/ubah-nilai-batasan' // Redirect ke form jika gagal
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error',
      redirect: '/pengaturan' 
    });
  }
}


}

module.exports = PengaturanController;