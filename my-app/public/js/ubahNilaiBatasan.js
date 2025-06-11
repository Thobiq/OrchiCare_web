
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ubahBatasanForm');
    const modal = document.getElementById('confirmModal');
    const btnYes = document.getElementById('confirmYes');
    const btnNo = document.getElementById('confirmNo');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (modal) {
                modal.style.display = 'flex';
            } else {
                console.error('Modal element not found! Cannot display confirmation.');
            }
        });
    }

    if (btnYes) {
        btnYes.addEventListener('click', async function () {
            if (modal) {
                modal.style.display = 'none'; 
            }

            const formData = new FormData(form);
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                const result = await res.json();

                if (res.ok) {
                    
                    Swal.fire({
                        icon: 'success', 
                        title: 'Berhasil!',
                        text: result.message || 'Data batasan berhasil diubah.',
                        showConfirmButton: false, 
                        timer: 2000 
                    }).then(() => {
                       
                        const redirectTo = result.redirect || '/pengaturan';
                        window.location.href = redirectTo;
                    });

                } else {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi Kesalahan!',
                        text: result.message || 'Gagal menyimpan data batasan. Silakan coba lagi.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/pengaturan/ubah-nilai-batasan';
                    });
                }
            } catch (err) {
                console.error('Error during form submission:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan Koneksi!',
                    text: "Terjadi kesalahan saat berkomunikasi dengan server: " + err.message,
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/pengaturan/ubah-nilai-batasan'; 
                });
            }
        });
    }
    if (btnNo) {
        btnNo.addEventListener('click', function () {
            if (modal) {
                modal.style.display = 'none';
            }
            window.location.href = '/pengaturan/ubah-nilai-batasan'; 
        });
    }
});