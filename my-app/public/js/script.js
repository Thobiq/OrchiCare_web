// ======================================================
// 🧭 UMUM / NAVIGASI
// ======================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Notifikasi koneksi IoT
function showIoTNotification(message) {
  const notif = document.getElementById('iot-notification');
  document.getElementById('iot-message').textContent = message;
  notif.classList.remove('hidden');
}

function hideIoTNotification() {
  document.getElementById('iot-notification').classList.add('hidden');
}

function tryReconnect() {
  alert("Mencoba menyambungkan kembali...");
}

// ======================================================
// 👤 PROFIL PENGGUNA
// ======================================================
const userName = document.getElementById('userName');
const profilePic = document.getElementById('profilePic');

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

profilePic?.addEventListener('click', () => {
  window.location.href = '/profil'; 
});

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log("Data yang disimpan:", name, email, password);
  alert("Profile berhasil diperbarui!");
  window.location.href = 'profile.html';
}

function toggleEdit() {
  const form = document.getElementById("editProfileForm");
  form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
}

// ======================================================
// 📊 MONITORING - CHART SECTION
// ======================================================
let tempChart, humChart, plantHumChart;
const maxTemp = 30, maxHum = 100, maxPlantHum = 100;

const getColorTemp = (val) => val >= 31 ? '#EF5350' : val === 30 ? '#FBC02D' : (val >= 28 ? '#28C76F' : '#E0E0E0');
const getColorHum = (val) => val > 80 ? '#EF5350' : val === 80 ? '#FBC02D' : '#28C76F';
const getColorPlantHum = (val) => val < 30 ? '#EF5350' : (val < 60 ? '#FBC02D' : '#28C76F');

const createChart = (ctx, initialValue, type) => {
  const max = type === 'temperature' ? maxTemp : (type === 'humidity' ? maxHum : maxPlantHum);
  const color = type === 'temperature' ? getColorTemp(initialValue) : (type === 'humidity' ? getColorHum(initialValue) : getColorPlantHum(initialValue));
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
  const max = type === 'temperature' ? maxTemp : (type === 'humidity' ? maxHum : maxPlantHum);
  const color = type === 'temperature' ? getColorTemp(value) : (type === 'humidity' ? getColorHum(value) : getColorPlantHum(value));
  const percent = (Math.min(value, max) / max) * 100;

  chart.data.datasets[0].data = [percent, 100 - percent];
  chart.data.datasets[0].backgroundColor = [color, '#E0E0E0'];
  chart.update();
  element.innerText = `${value}${unit}`;
};

const fetchData = async () => {
  try {
    const suhuRes = await fetch('/monitoring/suhu');
    const suhuData = await suhuRes.json();

    const humRes = await fetch('/monitoring/kelembaban-gh');
    const humData = await humRes.json();

    const plantHumRes = await fetch('/monitoring/kelembaban-tanaman');
    const plantHumData = await plantHumRes.json();

    if (document.getElementById('tempChart')) {
      updateChart(tempChart, suhuData.suhuGreenhouse, document.getElementById('tempValue'), '°C', 'temperature');
    }

    if (document.getElementById('humChart')) {
      updateChart(humChart, humData.kelembapanGreenhouse, document.getElementById('humValue'), '%', 'humidity');
    }

    if (document.getElementById('plantHumChart')) {
      updateChart(plantHumChart, plantHumData.kelembapanTanaman, document.getElementById('plantHumValue'), '%', 'plant');
    }

    if (suhuData.suhuGreenhouse === 0 || suhuData.suhuGreenhouse === undefined) {
      showIoTNotification('Perangkat belum terhubung');
    } else {
      hideIoTNotification();
    }

  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

window.onload = () => {
  tempChart = createChart(document.getElementById('tempChart'), 0, 'temperature');
  humChart = createChart(document.getElementById('humChart'), 0, 'humidity');
  plantHumChart = createChart(document.getElementById('plantHumChart'), 0, 'plant');
  fetchData();
  setInterval(fetchData, 1000);
};

// ======================================================
// ⚙️ KONTROL MANUAL & MODE OTOMATIS
// ======================================================
const fanButton = document.getElementById('fanButton');
const fanImage = document.getElementById('fanImage');
const sprinkleButton = document.getElementById('sprinkleButton');
const sprinkleImage = document.getElementById('sprinkleImage');
const modeNotice = document.getElementById('modeNotice');

let currentMode = 'otomatis';

const fanOff = 'assets/img/fan-off.png';
const fanOn = 'assets/img/fan-on.png';
const sprinkleOff = 'assets/img/sprinkle-off.png';
const sprinkleOn = 'assets/img/sprinkle-on.png';

fanButton.addEventListener('click', () => {
  if (currentMode !== 'manual') return;
  const isOff = fanButton.textContent === 'OFF';
  fanButton.textContent = isOff ? 'ON' : 'OFF';
  fanImage.src = isOff ? fanOn : fanOff;
  fanButton.classList.toggle('red', isOff);
});

sprinkleButton.addEventListener('click', () => {
  if (currentMode !== 'manual') return;
  const isOff = sprinkleButton.textContent === 'OFF';
  sprinkleButton.textContent = isOff ? 'ON' : 'OFF';
  sprinkleImage.src = isOff ? sprinkleOn : sprinkleOff;
  sprinkleButton.classList.toggle('red', isOff);
});

function showModal() {
  document.getElementById("modeModal").style.display = "block";
}

function closeModal() {
  document.getElementById("modeModal").style.display = "none";
}

function setMode(mode) {
  const title = document.getElementById("modeTitle");
  const description = document.getElementById("modeDescription");

  currentMode = mode;

  if (mode === "otomatis") {
    title.innerText = "Sistem dalam Mode Otomatis";
    description.innerText = "Sistem Berjalan Otomatis";
    modeNotice.style.display = "block";
    setControlsEnabled(false);
  } else {
    title.innerText = "Sistem dalam Mode Manual";
    description.innerText = "Sistem Berjalan Secara Manual";
    modeNotice.style.display = "none";
    setControlsEnabled(true);
  }

  closeModal();
}

function setControlsEnabled(enabled) {
  document.querySelectorAll('.control-button').forEach(button => {
    button.disabled = !enabled;
    button.style.opacity = enabled ? "1" : "0.5";
    button.style.cursor = enabled ? "pointer" : "not-allowed";
  });
}

window.onclick = function(event) {
  const modal = document.getElementById("modeModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ======================================================
// 🛠️ PENGATURAN BATAS SENSOR
// ======================================================
document.getElementById('limitForm').addEventListener('submit', async function (event) {
  event.preventDefault(); 

  const formData = {
    minTemp: document.getElementById('minTemp').value,
    maxTemp: document.getElementById('maxTemp').value,
    minHum: document.getElementById('minHum').value,
    maxHum: document.getElementById('maxHum').value,
    minPlantHum: document.getElementById('minPlantHum').value,
    maxPlantHum: document.getElementById('maxPlantHum').value,
  };

  try {
    const response = await fetch('/kontrol/limits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message); 
  } catch (error) {
    alert('Gagal mengirim data ke server!');
  }
});
