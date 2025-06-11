// ======================================================
// 📊 MONITORING - CHART SECTION
// ======================================================
let tempChart, humChart, plantHumChart;
const maxPlantHum = 100;

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

    const plantHumRes = await fetch('/monitoring/kelembaban-tanaman');
    const plantHumData = await plantHumRes.json();

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
  plantHumChart = createChart(document.getElementById('plantHumChart'), 0, 'plant');
  fetchData();
  setInterval(fetchData, 1000);
};


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/pengaturan/nilai-batasan');
    const data = await res.json();
    console.log('Fetched batasan:', data);

    if (res.ok) {
      document.getElementById('min-kt').innerHTML = `<b>${data.minKelembabanTanaman}</b>`;
      document.getElementById('max-kt').innerHTML = `<b>${data.maxKelembabanTanaman}</b>`;
    } else {
      console.error('Gagal mengambil nilai batasan:', data.error);
    }
  } catch (err) {
    console.error('Terjadi kesalahan saat mengambil nilai batasan:', err);
  }
});