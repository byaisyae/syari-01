/* ==========================================================================
   DATA UNDANGAN — satu-satunya file yang diedit untuk tiap pesanan.
   Isi dari formlist.txt kostumer. Bagian bertanda (opsional) boleh dikosongkan.
   ========================================================================== */
window.CONFIG = {
  /* ---------- 1. IDENTITAS HALAMAN ---------- */
  meta: {
    title: "Asep & Reihanna — 23 Agustus 2026", // judul tab browser
  },

  /* ---------- 2. WARNA ---------- */
  // Cukup 1 warna utama (kode hex). Seluruh tema (terang-gelap, bayangan, tombol) dibuat otomatis.
  // Contoh: pink "#f176a7", hijau sage "#7a9a7e", biru "#5b8fd1", ungu "#9b6bd1", emas "#c9a24d"
  theme: {
    primary: "#f176a7",
  },

  /* ---------- 3. MEMPELAI ---------- */
  couple: {
    first: "groom", // siapa yang namanya tampil lebih dulu: "groom" (pria) atau "bride" (wanita)
    groom: {
      name: "Asep Saepudin, S.T", // nama lengkap + gelar
      nick: "Asep", // nama panggilan (cover, judul, penutup)
      ig: "", // username Instagram tanpa @ (opsional)
      relation: "Putra dari", // mis. "Putra pertama dari"
      father: "Bapak Baci Surdana",
      mother: "Ibu Endang Purnama Wati",
    },
    bride: {
      name: "apt. Reihanna Yasmine Fauzia, S.Farm",
      nick: "Reihanna",
      ig: "",
      relation: "Putri dari",
      father: "Bapak Drs. Misna (Rahimahullāh)",
      mother: "Ibu Iyos Rosmiyati S.Pd (Rahimahallāh)",
    },
  },

  /* ---------- 4. ACARA ---------- */
  event: {
    // Tanggal & jam dalam format ISO + zona waktu: WIB = +07:00, WITA = +08:00, WIT = +09:00
    start: "2026-08-23T08:00:00+07:00", // mulai (dipakai hitung mundur & kalender)
    end: "2026-08-23T14:00:00+07:00", // selesai (dipakai kalender)
    timeZone: "Asia/Jakarta", // Asia/Jakarta (WIB), Asia/Makassar (WITA), Asia/Jayapura (WIT)
    // Daftar acara: 1 sampai 3 acara. date (opsional) = tanggal khusus acara ini (ISO), kosong = tanggal utama
    list: [
      {
        type: "Akad Nikah",
        time: "10.00 – 11.00 WIB",
        venue: "Hotel Grage Resort Sangkan",
        address: "Jl. Panawuan-Sangkanurip, Panawuan, Kec. Cigandamekar, Kabupaten Kuningan, Jawa Barat 45556",
        date: "",
      },
      {
        type: "Walimah",
        time: "11.00 – 15.00 WIB",
        venue: "Hotel Grage Resort Sangkan",
        address: "Jl. Panawuan-Sangkanurip, Panawuan, Kec. Cigandamekar, Kabupaten Kuningan, Jawa Barat 45556",
        date: "",
      },
    ],
  },

  /* ---------- 5. LOKASI (PETA) ---------- */
  maps: {
    // Acara yang ditampilkan di bagian Lokasi: nomor urut di list acara (0 = acara pertama). Kosong = acara terakhir
    eventIndex: 1,
    // Kata kunci pencarian untuk peta tersemat — makin spesifik makin akurat: "Nama Gedung, Jalan, Kota"
    query: "Hotel Grage Resort Sangkan, Jl. Panawuan-Sangkanurip, Panawuan, Kec. Cigandamekar, Kabupaten Kuningan, Jawa Barat 45556",
    // Link Google Maps untuk tombol "Buka Google Maps" (opsional). Kosong = pakai pencarian dari query
    link: "https://www.google.com/maps/place/grage+sangkan+resort/data=!4m2!3m1!1s0x2e6f19dd9ea61cb9:0x48334f199201c248",
  },

  /* ---------- 6. KONTAK & RSVP ---------- */
  contact: {
    // Nomor WhatsApp penerima konfirmasi RSVP: format internasional tanpa +, contoh 6281234567890
    whatsapp: "6281224514128",
  },
  rsvp: {
    maxGuests: 4, // jumlah tamu maksimal pada pilihan
    // Pilihan konfirmasi kehadiran
    attendance: ["InsyaAllah hadir", "Masih belum pasti", "Mohon maaf, belum dapat hadir"],
  },

  /* ---------- 7. MUSIK ---------- */
  music: {
    src: "assets/audio/backsound.mp3", // file lagu (mp3). Kosongkan "" untuk tanpa musik
    volume: 0.45, // 0 - 1
  },

  /* ---------- 8. TEKS & AYAT (boleh dibiarkan bawaan) ---------- */
  hero: {
    basmalah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    kicker: "Walimatul ‘Ursy",
    intro:
      "Dengan memohon rahmat dan rida Allah Subhanahu wa Ta‘ala, kami bermaksud menyelenggarakan pernikahan dan mengundang Bapak/Ibu/Saudara/i untuk hadir serta memberikan doa terbaik.",
  },
  verse: {
    kicker: "Sakinah • Mawaddah • Rahmah",
    title: "Tanda Kebesaran-Nya",
    arabic:
      "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً",
    translation:
      "Di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: { text: "QS. Ar-Rūm [30]: 21", url: "https://quran.com/30/21" },
  },
  couplePage: {
    kicker: "Bismillahirrahmanirrahim",
    title: "Dengan Niat Ibadah",
    text: "Semoga Allah menyatukan langkah kami dalam ketaatan dan kebaikan.",
  },

  /* ---------- 9. BAGIAN OPSIONAL (true = tampil, false = sembunyikan) ---------- */
  show: {
    seating: true, // pengaturan area tamu pria/wanita/umum
    dalil: true, // nasihat pernikahan (dalil)
    adab: true, // adab menghadiri walimah
    location: true, // peta lokasi
    rsvp: true, // form RSVP ke WhatsApp
  },
  // Area tamu (juga dipakai sebagai pilihan area di RSVP). Kosongkan [] jika tidak dipakai
  seating: {
    text: "Untuk menjaga adab dan kenyamanan bersama, area tamu disiapkan dengan pengaturan berikut.",
    areas: [
      { title: "Area Tamu Pria", text: "Area khusus untuk tamu pria dengan tempat duduk tersendiri." },
      { title: "Area Tamu Wanita", text: "Area khusus untuk tamu wanita dengan tempat duduk tersendiri." },
      { title: "Area Umum", text: "Tetap tersedia area umum bagi keluarga dan kerabat yang membutuhkan." },
    ],
  },
  dalil: {
    title: "Nasihat Pernikahan",
    text: "Beberapa dalil yang menjadi pengingat agar pernikahan dibangun di atas iman, kasih sayang, dan ketaatan.",
    items: [
      {
        tag: "Al-Qur’an",
        arabic: "وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ",
        translation: "Segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat kebesaran Allah.",
        source: { text: "QS. Az-Zariyat [51]: 49", url: "https://quran.com/51/49" },
      },
      {
        tag: "Al-Qur’an",
        arabic: "يٰٓاَيُّهَا النَّاسُ اِنَّا خَلَقْنٰكُمْ مِّنْ ذَكَرٍ وَّاُنْثٰى وَجَعَلْنٰكُمْ شُعُوْبًا وَّقَبَاۤىِٕلَ لِتَعَارَفُوْا",
        translation:
          "Wahai manusia, sesungguhnya Kami menciptakan kamu dari seorang laki-laki dan seorang perempuan, lalu menjadikan kamu berbangsa-bangsa dan bersuku-suku agar kamu saling mengenal.",
        source: { text: "QS. Al-Hujurat [49]: 13", url: "https://quran.com/49/13" },
      },
      {
        tag: "Hadis Sahih",
        arabic: "يَا مَعْشَرَ الشَّبَابِ مَنِ اسْتَطَاعَ مِنْكُمُ الْبَاءَةَ فَلْيَتَزَوَّجْ",
        translation:
          "Wahai para pemuda, siapa di antara kalian yang telah mampu menikah, hendaklah ia menikah. Sebab menikah lebih menundukkan pandangan dan lebih menjaga kehormatan.",
        source: { text: "Ṣaḥīḥ al-Bukhārī no. 5066", url: "https://sunnah.com/bukhari:5066" },
      },
    ],
  },
  adab: {
    kicker: "Mohon Diperhatikan",
    title: "Adab Menghadiri Walimah",
    items: [
      { title: "Meluruskan Niat", text: "Hadir untuk memenuhi undangan, bersilaturahmi, dan mendoakan pengantin." },
      { title: "Berpakaian Sopan", text: "Kenakan pakaian yang rapi, sopan, dan menutup aurat." },
      { title: "Menjaga Pandangan", text: "Mari saling menjaga pandangan dan interaksi dengan lawan jenis." },
      { title: "Menjaga Shalat", text: "Tetap memperhatikan waktu Shalat selama rangkaian acara berlangsung." },
      { title: "Tidak Berlebihan", text: "Menikmati jamuan secukupnya serta menjaga kebersihan dan ketertiban." },
    ],
  },
  closing: {
    arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    latin: "Bārakallāhu laka wa bāraka ‘alaika wa jama‘a bainakumā fī khair.",
    meaning: "Semoga Allah memberkahimu, melimpahkan keberkahan atasmu, dan menghimpun kalian berdua dalam kebaikan.",
    source: { text: "Sunan Abī Dāwud no. 2130", url: "https://sunnah.com/abudawud:2130" },
    title: "Jazakumullahu khairan",
    text: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.",
  },
};
