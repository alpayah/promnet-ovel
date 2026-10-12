// ===== 1. DATA CERITA (array berisi object) =====
const dataCerita = [
  {
    id: 1,
    judul: "Surat untuk Hujan",
    penulis: "Nadia Putri",
    genre: "Romantis",
    pembaca: "12,4 rb",
    ikon: "💌",
    warna: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    sinopsis: "Setiap hujan turun, Laras menulis surat yang tak pernah ia kirim. Sampai suatu hari, seseorang membalas semua suratnya."
  },
  {
    id: 2,
    judul: "Kode Rahasia Kelas 12",
    penulis: "Rizky Pratama",
    genre: "Misteri",
    pembaca: "8,9 rb",
    ikon: "🔍",
    warna: "linear-gradient(135deg, #434343, #6b6b8d)",
    sinopsis: "Sebuah pesan berkode muncul di papan tulis setiap Jumat. Tiga siswa memutuskan memecahkannya sebelum kelulusan."
  },
  {
    id: 3,
    judul: "Negeri di Balik Awan",
    penulis: "Salsabila A.",
    genre: "Fantasi",
    pembaca: "21 rb",
    ikon: "🏰",
    warna: "linear-gradient(135deg, #5ee7df, #b490ca)",
    sinopsis: "Mira menemukan tangga tersembunyi di atap sekolah yang menuju kerajaan di atas awan, dan kerajaan itu butuh bantuannya."
  },
  {
    id: 4,
    judul: "Asrama Lantai Tiga",
    penulis: "Dimas Anggara",
    genre: "Horor",
    pembaca: "15,2 rb",
    ikon: "👻",
    warna: "linear-gradient(135deg, #232526, #414345)",
    sinopsis: "Penghuni baru asrama selalu mendengar langkah kaki pukul tiga pagi dari lantai yang katanya sudah lama kosong."
  },
  {
    id: 5,
    judul: "Kopi Pertama di Bulan Juni",
    penulis: "Anisa Rahma",
    genre: "Romantis",
    pembaca: "6,7 rb",
    ikon: "☕",
    warna: "linear-gradient(135deg, #f6d365, #fda085)",
    sinopsis: "Barista baru dan pelanggan setia berbagi cerita lewat tulisan kecil di gelas kopi, tanpa pernah tahu nama satu sama lain."
  },
  {
    id: 6,
    judul: "Petualangan Si Kancil Digital",
    penulis: "Fajar Nugroho",
    genre: "Petualangan",
    pembaca: "9,3 rb",
    ikon: "🦌",
    warna: "linear-gradient(135deg, #43e97b, #38f9d7)",
    sinopsis: "Kancil terjebak di dunia game dan harus memakai kecerdikannya untuk melewati level demi level agar bisa pulang."
  }
];

// ===== 2. AMBIL ELEMEN HTML (DOM) =====
const daftarCerita = document.getElementById("daftarCerita");
const inputCari = document.getElementById("inputCari");
const formKontak = document.getElementById("formKontak");
const btnYa = document.getElementById("btnYa");

// Objek modal Bootstrap (supaya bisa dibuka/ditutup lewat JS)
const modalSinopsis = new bootstrap.Modal(document.getElementById("modalSinopsis"));
const modalKonfirmasi = new bootstrap.Modal(document.getElementById("modalKonfirmasi"));

// ===== 3. FUNGSI MENAMPILKAN CARD =====
function tampilkanCerita(daftar) {
  daftarCerita.innerHTML = ""; // kosongkan dulu

  if (daftar.length === 0) {
    daftarCerita.innerHTML = '<p class="text-center text-muted">Cerita tidak ditemukan.</p>';
    return;
  }

  // Untuk setiap cerita, buat satu card. Kolomnya col-md-4 (3 kolom di layar besar)
  daftar.forEach(function (cerita) {
    daftarCerita.innerHTML += `
      <div class="col-md-4">
        <div class="card card-cerita h-100">
          <div class="sampul" style="background: ${cerita.warna}">${cerita.ikon}</div>
          <div class="card-body d-flex flex-column">
            <span class="badge badge-genre align-self-start mb-2">${cerita.genre}</span>
            <h5 class="card-title">${cerita.judul}</h5>
            <p class="card-text text-muted mb-1">oleh ${cerita.penulis}</p>
            <p class="card-text small mb-3">👁 ${cerita.pembaca} pembaca</p>
            <button class="btn btn-primary btn-sm mt-auto btn-baca" data-id="${cerita.id}">
              Baca Sinopsis
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Tampilkan semua cerita saat halaman pertama kali dibuka
tampilkanCerita(dataCerita);

// ===== 4. KLIK TOMBOL "BACA SINOPSIS" -> ISI MODAL =====
// Card dibuat lewat JS, jadi event dipasang di induknya (event delegation)
daftarCerita.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-baca")) {
    const id = Number(e.target.dataset.id);
    const cerita = dataCerita.find(function (item) {
      return item.id === id;
    });

    document.getElementById("judulSinopsis").textContent = cerita.judul;
    document.getElementById("infoSinopsis").textContent = cerita.penulis + " • " + cerita.genre;
    document.getElementById("isiSinopsis").textContent = cerita.sinopsis;
    modalSinopsis.show();
  }
});

// ===== 5. FITUR PENCARIAN =====
inputCari.addEventListener("input", function () {
  const kataKunci = inputCari.value.toLowerCase();

  const hasil = dataCerita.filter(function (cerita) {
    return (
      cerita.judul.toLowerCase().includes(kataKunci) ||
      cerita.genre.toLowerCase().includes(kataKunci)
    );
  });

  tampilkanCerita(hasil);
});

// ===== 6. FORM KONTAK + MODAL KONFIRMASI (Latihan 5) =====
formKontak.addEventListener("submit", function (e) {
  e.preventDefault();      // cegah form langsung terkirim
  modalKonfirmasi.show();  // tampilkan modal konfirmasi
});

btnYa.addEventListener("click", function () {
  modalKonfirmasi.hide();
  formKontak.reset();      // kosongkan isi form
  alert("Pesan berhasil dikirim!");
});