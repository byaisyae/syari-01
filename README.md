# Template Undangan Pernikahan Syar'i

Undangan satu halaman: cover dengan nama tamu, hitung mundur, daftar acara, area tamu, dalil, adab, peta lokasi, dan RSVP lewat WhatsApp.

## Struktur
```
index.html            kerangka halaman + meta pratinjau link (diubah per pesanan)
css/style.css         seluruh gaya; warna memakai variabel --primary-* (diatur dari config)
scripts/
  config.js           DATA UNDANGAN — satu-satunya file yang diedit per pesanan
  theme.js            membuat palet warna dari CONFIG.theme.primary
  utils.js            fungsi bantu & data turunan (tanggal, urutan nama, acara lokasi)
  render.js           menyusun cover dan semua bagian dari config
  music.js            musik latar & tombol musik
  ui.js               cover/nama tamu, kelopak, animasi, navigasi, hitung mundur, kalender
  rsvp.js             form RSVP → WhatsApp
assets/               ornamen sakura (svg) dan audio
formlist.txt          daftar isian untuk dikirim ke kostumer via WhatsApp
```
Urutan pemanggilan script di `index.html` jangan ditukar: `config` → `theme` → `utils` (di head), lalu `render` → `music` → `ui` → `rsvp` (di akhir body).

## Langkah membuat undangan baru
1. Kirim `formlist.txt` ke kostumer lewat WhatsApp, tunggu jawabannya.
2. Salin folder ini, beri nama sesuai pesanan.
3. Isi `scripts/config.js` sesuai jawaban kostumer (tiap bagian sudah diberi komentar).
4. Ubah 5 baris meta (judul, deskripsi, og) di bagian atas `index.html`. Bagian ini dibaca WhatsApp/medsos sehingga tidak bisa diambil dari `config.js`.
5. Ganti lagu di `assets/audio/` lalu sesuaikan `music.src`.
6. Unggah semua file ke hosting (mis. GitHub Pages), bagikan link per tamu dengan `?to=Nama Tamu`.

## Peta isian formlist → config.js
| Isian formlist | Di config.js |
|---|---|
| 1-2 Data CPP / CPW | `couple.groom`, `couple.bride` (`name`, `nick`, `ig`, `relation`, `father`, `mother`) |
| Urutan nama di cover | `couple.first` ("groom" / "bride") |
| 3 Waktu acara | `event.start`, `event.end`, `event.timeZone` |
| 4 Daftar acara | `event.list[]` (`type`, `time`, `venue`, `address`, `date`) |
| 5 Lokasi peta | `maps.eventIndex`, `maps.query`, `maps.link` |
| 6 RSVP | `contact.whatsapp`, `rsvp.maxGuests`, `rsvp.attendance` |
| 7 Warna | `theme.primary` |
| 8 Musik | `music.src`, `music.volume` |
| 9 Isi halaman | `show.seating/dalil/adab/location/rsvp` |
| 10 Teks khusus | `verse`, `hero`, `closing`, `dalil`, `adab` |

## Catatan
- Tanggal, hari, dan bulan di seluruh halaman dihitung otomatis dari `event.start` (tidak perlu diketik ulang di tiap bagian).
- Tema warna dibuat dari satu warna utama; mengganti `theme.primary` mengubah semua tombol, latar bagian, dan bayangan.
- Font ada di tag `<link>` Google Fonts pada `index.html` dan variabel `--serif`, `--script`, `--sans`, `--arabic` di `css/style.css`.
