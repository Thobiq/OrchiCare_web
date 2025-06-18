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

  if (element) element.innerText = `${value}${unit}`;
};


const fetchData = async () => {
  try {
    
    const humRes = await fetch('/monitoring/kelembaban-gh');
    const humData = await humRes.json();
   
    const fanRes = await fetch('/monitoring/status-fan');
    const fanData = await fanRes.json();

    const sprinklerRes = await fetch('/monitoring/status-sprinkler');
    const sprinklerData = await sprinklerRes.json();


    
    if (document.getElementById('humChart') && humChart && humData.kelembabanGreenhouse !== undefined) {
      updateChart(
        humChart,
        humData.kelembabanGreenhouse,
        document.getElementById('humValue'),
        '%',
        'humidity'
      );
    }

    // Update Status Fan
    const fanElem = document.getElementById('fanStatus');
    fanElem.textContent = fanData.fanStatus;
    fanElem.className = `status-pill ${fanData.fanStatus === 'ON' ? 'status-on' : 'status-off'}`;

    // Update Status Sprinkler
    const sprinklerElem = document.getElementById('wateringStatus');
    sprinklerElem.textContent = sprinklerData.sprinklerStatus;
    sprinklerElem.className = `status-pill ${sprinklerData.sprinklerStatus === 'ON' ? 'status-on' : 'status-off'}`;

    // Deteksi jika tidak ada perangkat
    if (humData.kelembabanGreenhouse === 0 || humData.kelembabanGreenhouse === undefined) {
      showIoTNotification('Perangkat belum terhubung');
    } else {
      hideIoTNotification();
    }

  } catch (err) {
    console.error('❌ Error fetching data:', err);
  }
};

// 📥 Ambil nilai batasan dan tampilkan
const fetchNilaiBatasan = async () => {
  try {
    const res = await fetch('/pengaturan/nilai-batasan');
    const data = await res.json();
    console.log('📋 Fetched batasan:', data);

    if (res.ok) {
      document.getElementById('min-kgh').innerHTML = `<b>${data.minKelembabanGreenhouse}</b>`;
      document.getElementById('max-kgh').innerHTML = `<b>${data.maxKelembabanGreenhouse}</b>`;
    } else {
      console.error('⚠️ Gagal mengambil nilai batasan:', data.error);
    }
  } catch (err) {
    console.error('❌ Terjadi kesalahan saat mengambil nilai batasan:', err);
  }
};

// 🚀 Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', async () => {
  // Buat chart
  const humCtx = document.getElementById('humChart');
  if (humCtx) {
    humChart = createChart(humCtx, 0, 'humidity');
  } else {
    console.warn('⚠️ Element humChart tidak ditemukan di DOM');
  }

  // Mulai loop data
  await fetchData();
  setInterval(fetchData, 1000);

  // Ambil nilai batasan
  await fetchNilaiBatasan();
});
