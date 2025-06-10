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