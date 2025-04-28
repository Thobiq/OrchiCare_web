// ===================== Umum =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const userName = document.getElementById('userName');
const profilePic = document.getElementById('profilePic');
const fanButton = document.getElementById('fanButton');
const fanImage = document.getElementById('fanImage');
const sprinkleButton = document.getElementById('sprinkleButton');
const sprinkleImage = document.getElementById('sprinkleImage');


if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const user = {
  name: "fufufafa",
  profileImage: "assets/gibran.jpeg"
};

function updateUserProfile() {
  if (userName && profilePic) {
    userName.textContent = user.name;
    profilePic.src = user.profileImage;
  }
}

updateUserProfile();

// ===================== Chart Section =====================
let tempChart, humChart, plantHumChart;
const maxTemp = 30;
const maxHum = 100;
const maxPlantHum = 100;

const getColorTemp = (value) => {
  if (value >= 31) return '#EF5350';
  else if (value >= 28 && value <= 29) return '#28C76F';
  else if (value === 30) return '#FBC02D';
  else return '#E0E0E0';
};

const getColorHum = (value) => {
  if (value > 80) return '#EF5350';
  else if (value === 80) return '#FBC02D';
  else if (value <= 79) return '#28C76F';
  else return '#E0E0E0';
};

const getColorPlantHum = (value) => {
  if (value < 30) return '#EF5350';       // merah
  else if (value < 60) return '#FBC02D';  // kuning
  else return '#28C76F';                  // hijau
};

const createChart = (ctx, initialValue, type) => {
  let max;
  let color;

  if (type === 'temperature') {
    max = maxTemp;
    color = getColorTemp(initialValue);
  } else if (type === 'humidity') {
    max = maxHum;
    color = getColorHum(initialValue);
  } else if (type === 'plant') {
    max = maxPlantHum;
    color = getColorPlantHum(initialValue);
  }

  const percent = (Math.min(initialValue, max) / max) * 100;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [percent, 100 - percent],
        backgroundColor: [color, '#E0E0E0'],
        borderWidth: 0
      }]
    },
    options: {
      rotation: -130,
      circumference: 260,
      cutout: '80%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }
      },
      animation: false
    }
  });
};

const updateChart = (chart, value, element, unit = '%', type = 'humidity') => {
  let max;
  let color;

  if (type === 'temperature') {
    max = maxTemp;
    color = getColorTemp(value);
  } else if (type === 'humidity') {
    max = maxHum;
    color = getColorHum(value);
  } else if (type === 'plant') {
    max = maxPlantHum;
    color = getColorPlantHum(value);
  }

  const percent = (Math.min(value, max) / max) * 100;
  chart.data.datasets[0].data = [percent, 100 - percent];
  chart.data.datasets[0].backgroundColor = [color, '#E0E0E0'];
  chart.update();
  element.innerText = `${value}${unit}`;
};

const setStatus = (element, status) => {
  if (!element) return;
  element.textContent = status;
  if (status === 'ON') {
    element.classList.remove('status-off');
  } else {
    element.classList.add('status-off');
  }
};

const fetchData = async () => {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();

    if (document.getElementById('tempChart')) {
      updateChart(tempChart, data.temperature, document.getElementById('tempValue'), '°C', 'temperature');
    }

    if (document.getElementById('humChart')) {
      updateChart(humChart, data.humidity, document.getElementById('humValue'), '%', 'humidity');
    }

    if (document.getElementById('plantHumChart')) {
      updateChart(plantHumChart, data.soilMoisture, document.getElementById('plantHumValue'), '%', 'plant');
    }

    const sensorStatusEl = document.getElementById('sensorStatus');
    const wateringEl = document.getElementById('wateringStatus');
    const fanEl = document.getElementById('fanStatus');

    if (sensorStatusEl) {
      setStatus(sensorStatusEl, data.sensorStatus || '--');
    }
    if (wateringEl) {
      setStatus(wateringEl, data.wateringStatus || '--');
    }
    if (fanEl) {
      setStatus(fanEl, data.fanStatus || '--');
    }

  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

window.onload = () => {
  if (document.getElementById('tempChart')) {
    tempChart = createChart(document.getElementById('tempChart'), 25.5, 'temperature');
  }
  if (document.getElementById('humChart')) {
    humChart = createChart(document.getElementById('humChart'), 75, 'humidity');
  }
  if (document.getElementById('plantHumChart')) {
    plantHumChart = createChart(document.getElementById('plantHumChart'), 45, 'plant');
  }
  fetchData();
  setInterval(fetchData, 1000);
};


// ===================== Controlling Section =====================

const fanOff = 'assets/img/fan-off.png';
const fanOn = 'assets/img/fan-on.png';
const sprinkleOff = 'assets/img/sprinkle-off.png';
const sprinkleOn = 'assets/img/sprinkle-on.png';

fanButton.addEventListener('click', () => {
  const isOff = fanButton.textContent === 'OFF';
  fanButton.textContent = isOff ? 'ON' : 'OFF';
  fanImage.src = isOff ? fanOn : fanOff;
  fanButton.classList.toggle('red', isOff); // Mengubah warna tombol menjadi merah jika "ON"
});

sprinkleButton.addEventListener('click', () => {
  const isOff = sprinkleButton.textContent === 'OFF';
  sprinkleButton.textContent = isOff ? 'ON' : 'OFF';
  sprinkleImage.src = isOff ? sprinkleOn : sprinkleOff;
  sprinkleButton.classList.toggle('red', isOff); // Mengubah warna tombol menjadi merah jika "ON"
});