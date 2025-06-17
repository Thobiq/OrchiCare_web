fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        document.getElementById('profile-name').innerText = data.username;
        document.getElementById('profile-email').innerText = data.email;
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error);
        document.getElementById('profile-name').innerText = 'Gagal memuat nama';
        document.getElementById('profile-email').innerText = 'Gagal memuat email';
      });

async function handleSubmit(event) {
      event.preventDefault();
      const confirmSave = confirm("Apakah Anda yakin ingin menyimpan perubahan?");
      if (!confirmSave) return;

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/edit_profil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const result = await res.json();
        if (result.success) {
          alert("Data berhasil disimpan!");
          window.location.href = '/profil';
        } else {
          alert("Gagal menyimpan data.");
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan.");
      }
    }
