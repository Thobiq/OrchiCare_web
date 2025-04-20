require('./mqtt/mqttHandler');


const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const sensorRoutes = require('./routes/sensorRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', sensorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


