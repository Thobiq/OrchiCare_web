const form = document.getElementById('filterForm');
const tbody = document.getElementById('dataBody');
const hapusBtn = document.getElementById('hapusBtn');

const modal = document.getElementById('hapusModal');
const hapusFrom = document.getElementById('hapusFrom');
const hapusTo = document.getElementById('hapusTo');
const confirmHapus = document.getElementById('confirmHapus');
const cancelHapus = document.getElementById('cancelHapus');

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

async function fetchData(from, to) {
  let url = '/riwayat';
  if (from && to) url += `?from=${from}&to=${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    tbody.innerHTML = '';

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4">Tidak ada data ditemukan.</td></tr>';
      return;
    }

    data.forEach(row => {
      tbody.innerHTML += `
        <tr>
          <td>${row.suhuGreenhouse}</td>
          <td>${row.kelembapanGreenhouse}</td>
          <td>${row.kelembapanTanaman}</td>
          <td>${new Date(row.createdAt).toLocaleString()}</td>
        </tr>
      `;
    });
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="4">Gagal memuat data.</td></tr>';
    console.error(error);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  fetchData(from, to);
});

hapusBtn.addEventListener('click', () => modal.style.display = 'flex');
cancelHapus.addEventListener('click', () => modal.style.display = 'none');

confirmHapus.addEventListener('click', async () => {
  const from = hapusFrom.value;
  const to = hapusTo.value;

  if (!from || !to) {
    alert("Rentang waktu tidak lengkap.");
    return;
  }

  try {
    const res = await fetch('/riwayat', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to })
    });

    const result = await res.json();
    if (res.ok) {
      alert("Data berhasil dihapus!");
      modal.style.display = 'none';
      fetchData(getTodayDate(), getTodayDate());
    } else {
      alert(result.error || "Gagal menghapus data.");
    }
  } catch (error) {
    alert("Terjadi kesalahan saat menghapus.");
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const today = getTodayDate();
  document.getElementById('from').value = today;
  document.getElementById('to').value = today;
  fetchData(today, today);
});
