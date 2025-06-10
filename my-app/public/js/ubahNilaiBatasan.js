document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ubahBatasanForm');
    const modal = document.getElementById('confirmModal');
    const btnYes = document.getElementById('confirmYes');
    const btnNo = document.getElementById('confirmNo');

    // --- LOG UNTUK DEBUGGING ---
    console.log('Script DOMContentLoaded loaded.');
    console.log('Form element:', form);
    console.log('Modal element:', modal);
    // --- AKHIR LOG UNTUK DEBUGGING ---

    // 1. Tangani submit form: Tampilkan modal, bukan langsung submit
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Hentikan submit form standar

        if (modal) {
            modal.style.display = 'flex'; // Tampilkan modal konfirmasi
            console.log('Modal display set to flex on form submit.'); // Debugging log
        } else {
            console.error('Modal element not found! Cannot display confirmation.'); // Error log
        }
    });

    // 2. Tangani klik "Ya" di modal: Lakukan penyimpanan dan redirect
    btnYes.addEventListener('click', async function () {
        if (modal) {
            modal.style.display = 'none'; // Sembunyikan modal
            console.log('Modal display set to none after Yes click.'); // Debugging log
        }

        const formData = new FormData(form);
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const result = await res.json(); // Ambil respons JSON dari server
            console.log('Server response after "Yes":', result); // Debugging log

            if (res.ok) { // Pastikan respons dari server adalah sukses (status 200-299)
                // ... (di dalam if (res.ok)) ...
                if (result.redirect) {
                    console.log('Redirecting to:', result.redirect);
                    // Beri sedikit jeda sebelum redirect
                    setTimeout(() => {
                        window.location.href = result.redirect;
                    }, 100); // Jeda 100 milidetik
                } else {
                    window.location.href = '/pengaturan';
                }
// ...
            } else {
                // Jika server merespons dengan error (misal status 400 atau 500)
                alert(result.message || 'Terjadi kesalahan saat menyimpan data.');
                // Anda bisa memilih untuk redirect kembali ke form ubah atau tetap di halaman ini
                window.location.href = '/pengaturan/ubah-nilai-batasan'; // Redirect kembali ke form jika gagal
            }
        } catch (err) {
            console.error('Error during form submission:', err); // Log error lebih detail
            alert("Terjadi kesalahan koneksi atau server: " + err.message);
            // Dalam kasus error fetch, bisa juga redirect ke halaman awal atau menampilkan pesan error
            window.location.href = '/pengaturan/ubah-nilai-batasan'; // Redirect kembali ke form
        }
    });

    // 3. Tangani klik "Tidak" di modal: Tutup modal dan tidak lakukan apa-apa
    btnNo.addEventListener('click', function () {
        if (modal) {
            modal.style.display = 'none'; // Sembunyikan modal
            console.log('Modal display set to none after No click.'); // Debugging log
        }
        // Redirect kembali ke halaman yang sama (opsional, jika tidak ada aksi lain yang ingin dilakukan)
        window.location.href = '/pengaturan/ubah-nilai-batasan'; // Tetap di halaman form ini
    });
});