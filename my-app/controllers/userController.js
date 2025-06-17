const jwt = require('jsonwebtoken');
const Users = require('../models/users'); // model Sequelize

// Ambil profil user (API)
const getUserProfile = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: { email: decoded.email },
      attributes: ['username', 'email'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    res.json(user);
  } catch (err) {
    console.error('Gagal mengambil data pengguna:', err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

// Tampilkan halaman edit profil
const getEditProfile = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: { email: decoded.email }
    });

    res.render('edit_profil', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data user');
  }
};

// Proses simpan perubahan profil
const postEditProfile = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { name, email, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: { email: decoded.email }
    });

    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    user.username = name;
    user.email = email;
    user.password = password; // kalau real pakai bcrypt hash!

    await user.save();

    res.json({ success: true, message: 'Profil berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
};

module.exports = {
  getUserProfile,
  getEditProfile,
  postEditProfile
};
