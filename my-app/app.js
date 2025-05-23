require('./mqtt/mqttHandler');


const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());

const sensorRoutes = require('./routes/sensorRoutes');
const nilaiBatasanRoutes = require('./routes/nilaiBatasanRoutes');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/kontrol', nilaiBatasanRoutes);
app.use('/', sensorRoutes);
app.get('/', (req, res) => {
  res.render('index'); // Render index.ejs
});

app.get('/detail_temp', (req, res) => {
    res.render('detail_temp'); 
  });

app.get('/detail_hum', (req, res) => {
    res.render('detail_hum'); 
  });

app.get('/controlling', (req, res) => {
    res.render('controlling'); 
  });

app.get('/detail_hum_plant', (req, res) => {
    res.render('detail_hum_plant'); 
  });

app.get('/pengaturan', (req, res) => {
    res.render('pengaturan'); 
  });
  
app.get('/profil', (req, res) => {
    res.render('profil'); 
  });
app.get('/edit_profil', (req, res) => {
    res.render('edit_profil'); 
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


