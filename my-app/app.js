// Load variabel lingkungan terlebih dahulu
require('dotenv').config();

// Jalankan MQTT handler jika digunakan
require('./mqtt/mqttHandler');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// === MIDDLEWARE ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === VIEW ENGINE ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// === FOLDER STATIS ===
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets'))); // Optional folder tambahan jika kamu punya assets lain

// === ROUTING ===
const authRoutes = require('./routes/authRoutes');
const nilaiBatasanRoutes = require('./routes/nilaiBatasanRoutes');
const dataMonitoringRoutes = require('./routes/dataMonitoring');
const userRoutes = require('./routes/userRoutes');
const riwayatRoutes = require('./routes/riwayatMonitoringRoutes');

app.use('/', authRoutes);                         // login & autentikasi
app.use('/kontrol', nilaiBatasanRoutes);          // kontrol ambang batas
app.use('/dataMonitoring', dataMonitoringRoutes); // data sensor
app.use('/api', userRoutes); 
app.use('/riwayat', riwayatRoutes);                     // profil user dan API lain

// === ROUTING HALAMAN VIEW ===
app.get('/monitoring', (req, res) => {
  res.render('v_monitoring');
});

app.get('/detail_temp', (req, res) => {
  res.render('detail_temp');
});

app.get('/detail_hum', (req, res) => {
  res.render('detail_hum');
});

app.get('/ubah_nilai_batasan', (req, res) => {
res.render('ubah_nilai_batasan');
});

app.get('/detail_hum_plant', (req, res) => {
  res.render('detail_hum_plant');
});

app.get('/pengaturan', (req, res) => {
  res.render('v_pengaturan');
});

app.get('/profil', (req, res) => {
  res.render('profil');
});

app.get('/edit_profil', (req, res) => {
  res.render('edit_profil');
});

app.get('/riwayat_monitoring', (req, res) => {
  res.render('riwayat_monitoring');
});

// === MENJALANKAN SERVER ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
