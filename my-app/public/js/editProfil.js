document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      document.getElementById('name').value = data.username;
      document.getElementById('email').value = data.email;
    } catch (err) {
      alert('Gagal mengambil data profil');
    }
  });

  // Handle submit
  document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!confirm('Apakah Anda yakin ingin menyimpan perubahan?')) return;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/edit_profil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await res.json();

      if (result.success) {
        alert('Data berhasil disimpan!');
        window.location.href = '/profil';
      } else {
        alert('Gagal menyimpan data.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan.');
    }
  });
