// ======================================================
// 🧭 UMUM / NAVIGASI
// ======================================================
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
const profilePic = document.getElementById('profilePic');

const user = {
  name: "fufufafa",
  profileImage: "assets/gibran.jpeg"
};

function updateUserProfile() {
  if (userName && profilePic) {
    userName.textContent = user.name;
    profilePic.src = user.profileImage;
  }
}
updateUserProfile();

profilePic?.addEventListener('click', () => {
  window.location.href = '/profil'; 
});

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log("Data yang disimpan:", name, email, password);
  alert("Profile berhasil diperbarui!");
  window.location.href = 'profile.html';
}

function toggleEdit() {
  const form = document.getElementById("editProfileForm");
  form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
}

