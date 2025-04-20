// ---------- app.js ----------
const express = require('express');
const path = require('path');
const app = express();
const { sequelize } = require('./models');
const sensorRoutes = require('./routes/sensorRoutes');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', sensorRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Web API berjalan di port ${process.env.PORT}`);
  });
});