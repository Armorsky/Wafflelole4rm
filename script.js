/* ===== Menu aktif otomatis (scroll spy) =====
   Tanda siku putih pada navbar pindah mengikuti bagian yang sedang dilihat. */
const links = document.querySelectorAll('.menu .nav-link');
const bagian = Array.from(links)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function tandaiMenuAktif() {
  const garis = window.innerHeight * 0.35;          // garis acuan di 35% tinggi layar
  let aktif = bagian[0];

  bagian.forEach(el => {
    if (el.getBoundingClientRect().top <= garis) aktif = el;   // bagian terakhir yang sudah lewat garis
  });

  // jika sudah mentok di bawah halaman, aktifkan menu terakhir (Kontak)
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
    aktif = bagian[bagian.length - 1];
  }

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + aktif.id);
  });
}

window.addEventListener('scroll', tandaiMenuAktif, { passive: true });
window.addEventListener('resize', tandaiMenuAktif);
tandaiMenuAktif();

// tutup menu HP (collapse Bootstrap) setelah salah satu menu diklik
const menuHP = document.getElementById('mainMenu');
links.forEach(link => link.addEventListener('click', () => {
  if (menuHP.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(menuHP).hide();
  }
}));
