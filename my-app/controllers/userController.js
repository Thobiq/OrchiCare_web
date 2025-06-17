const Users = require('../models/users');
// const bcrypt = require('bcrypt'); // Optional, for secure password

// Tampilkan profil user (API)
const getUserProfile = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ['username', 'email'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    res.json(user);
  } catch (error) {
    console.error('Gagal mengambil data pengguna:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

// Tampilkan halaman edit profil
const getEditProfile = async (req, res) => {
  try {
    const user = await Users.findByPk(1); // Ganti 1 dengan ID dinamis jika ada session
    res.render('edit_profil', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data user');
  }
};

// Proses simpan perubahan profil
const postEditProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Users.findByPk(1); // Ganti 1 dengan ID dinamis jika ada session
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    user.username = name;
    user.email = email;
    user.password = password; // Gunakan bcrypt untuk hash di aplikasi real
    // user.password = await bcrypt.hash(password, 10); // Kalau mau hash password

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
