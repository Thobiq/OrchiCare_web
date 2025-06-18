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

fanButton.addEventListener('click', async () => {
  if (currentMode !== 'manual') {
    console.log('Tidak bisa kontrol kipas, mode bukan manual');
    return;
  }
  const isOff = fanButton.textContent === 'OFF';
  fanButton.textContent = isOff ? 'ON' : 'OFF';
  fanImage.src = isOff ? fanOn : fanOff;
  fanButton.classList.toggle('red', isOff);

  try {
    await fetch('/pengaturan/set-fan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fan_state: isOff ? 'ON' : 'OFF' })
    });
  } catch (err) {
    console.error('Gagal update fan:', err);
  }
});


sprinkleButton.addEventListener('click', async () => {
  if (currentMode !== 'manual') {
    console.log('Tidak bisa kontrol penyiram, mode bukan manual');
    return;
  }
  const isOff = sprinkleButton.textContent === 'OFF';
  sprinkleButton.textContent = isOff ? 'ON' : 'OFF';
  sprinkleImage.src = isOff ? sprinkleOn : sprinkleOff;
  sprinkleButton.classList.toggle('red', isOff);

  try {
    await fetch('/pengaturan/set-sprinkler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sprinkler_state: isOff ? 'ON' : 'OFF' })
    });
  } catch (err) {
    console.error('Gagal update sprinkler:', err);
  }
});

function showModal() {
  document.getElementById("modeModal").style.display = "block";
}

function closeModal() {
  document.getElementById("modeModal").style.display = "none";
}

async function setMode(mode) {
  const title = document.getElementById("modeTitle");
  const description = document.getElementById("modeDescription");

  currentMode = mode;
  console.log('Mode diubah ke:', mode);

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

  try {
    const fanState = fanButton.textContent;
    const sprinklerState = sprinkleButton.textContent;

    const payload = {
      command: "set_mode",
      mode,
      fan_state: fanState,
      sprinkler_state: sprinklerState
    };

    const res = await fetch('/pengaturan/set-mode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    console.log('Mode updated:', result.message || result);

  } catch (err) {
    console.error('Gagal mengirim mode ke server:', err);
  }
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
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/pengaturan/nilai-batasan');
    const data = await res.json();
    if (res.ok) {
      document.getElementById('min-suhu').innerHTML = `<b>${data.minSuhuGreenhouse}</b>`;
      document.getElementById('max-suhu').innerHTML = `<b>${data.maxSuhuGreenhouse}</b>`;
      document.getElementById('min-kgh').innerHTML = `<b>${data.minKelembabanGreenhouse}</b>`;
      document.getElementById('max-kgh').innerHTML = `<b>${data.maxKelembabanGreenhouse}</b>`;
      document.getElementById('min-kt').innerHTML = `<b>${data.minKelembabanTanaman}</b>`;
      document.getElementById('max-kt').innerHTML = `<b>${data.maxKelembabanTanaman}</b>`;
    } else {
      console.error('Gagal mengambil nilai batasan:', data.error);
    }
  } catch (err) {
    console.error('Terjadi kesalahan saat mengambil nilai batasan:', err);
  }
});
