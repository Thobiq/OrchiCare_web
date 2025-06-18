// ======================================================
// 🧭 UMUM / NAVIGASI
// ======================================================

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/profile');
    const data = await response.json();

    document.getElementById('userName').textContent = data.username;
  } catch (err) {
    console.error('Gagal mengambil data profil:', err);
    document.getElementById('userName').textContent = 'Tidak tersedia';
  }
});


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



const user = {
  profileImage: "assets/user.png"
};

function updateUserProfile() {
  if (userName && profilePic) {
  profilePic.src = user.profileImage;
  }
}
updateUserProfile();

profilePic?.addEventListener('click', () => {
  window.location.href = '/profil'; 
});

