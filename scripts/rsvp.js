/* RSVP: konfirmasi dikirim lewat WhatsApp ke nomor di CONFIG.contact.whatsapp. */
(() => {
  "use strict";
  const { C, people } = window.Inv;
  const form = document.getElementById("rsvpForm");
  const status = document.getElementById("formStatus");
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const KEY = "weddingRSVP";
  const names = people.map(([, p]) => p.nick || p.name).join(" & ");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const val = (k, d = "") => String(fd.get(k) || d).trim();
    const name = val("name"), attendance = val("attendance");
    const guestCount = val("guestCount", "1"), guestArea = val("guestArea");
    const wishes = val("wishes", "-") || "-";
    const phone = String(C.contact?.whatsapp || "").replace(/\D/g, "");

    if (!name || !attendance) {
      status.textContent = "Mohon lengkapi nama dan konfirmasi kehadiran.";
      return;
    }
    if (!phone || /^6280+$/.test(phone)) {
      status.textContent = "Nomor WhatsApp belum diatur. Ubah contact.whatsapp pada scripts/config.js.";
      window.showToast?.("Silakan atur nomor WhatsApp pada scripts/config.js.");
      return;
    }

    const message = [
      "Assalamu'alaikum warahmatullahi wabarakatuh.",
      "",
      `Konfirmasi Undangan Pernikahan ${names}`,
      `Nama: ${name}`,
      `Kehadiran: ${attendance}`,
      `Jumlah tamu: ${guestCount} orang`,
      ...(guestArea ? [`Pilihan area: ${guestArea}`] : []),
      `Doa/Ucapan: ${wishes}`,
      "",
      "Jazakumullahu khairan.",
    ].join("\n");

    localStorage.setItem(KEY, JSON.stringify({ name, attendance, guestCount, guestArea, wishes }));
    status.textContent = "WhatsApp akan dibuka untuk mengirim konfirmasi.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  // isi ulang form dengan data terakhir pengunjung
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved) {
      $("rsvpName").value = saved.name || "";
      $("attendance").value = saved.attendance || "";
      $("guestCount").value = saved.guestCount || "1";
      if ($("guestArea") && saved.guestArea) $("guestArea").value = saved.guestArea;
      $("wishes").value = saved.wishes === "-" ? "" : saved.wishes || "";
    }
  } catch {
    localStorage.removeItem(KEY);
  }
})();
