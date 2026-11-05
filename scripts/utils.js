/* Fungsi bantu & data turunan dari CONFIG yang dipakai bersama oleh render.js, ui.js, rsvp.js. */
(() => {
  "use strict";
  const C = window.CONFIG || {};
  const E = C.event || {};
  const tz = E.timeZone || "Asia/Jakarta";

  const esc = (v = "") =>
    String(v).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const pad = (n) => String(n).padStart(2, "0");

  // pecah tanggal ISO menjadi bagian-bagian (hari, tanggal, bulan, tahun) sesuai zona waktu acara
  const dateParts = (iso) => {
    const d = new Date(iso || E.start);
    const f = (o) => new Intl.DateTimeFormat("id-ID", { timeZone: tz, ...o }).format(d);
    const year = f({ year: "numeric" });
    return {
      weekday: f({ weekday: "long" }),
      day: f({ day: "numeric" }),
      dd: f({ day: "2-digit" }),
      month: f({ month: "long" }),
      mm: f({ month: "2-digit" }),
      year,
      yy: year.slice(2),
      iso: `${year}-${f({ month: "2-digit" })}-${f({ day: "2-digit" })}`,
    };
  };
  const fullDate = (p) => `${p.weekday}, ${p.day} ${p.month} ${p.year}`;

  const cp = C.couple || {};
  const groom = cp.groom || {};
  const bride = cp.bride || {};
  const people =
    cp.first === "bride"
      ? [["bride", bride, "Mempelai Wanita"], ["groom", groom, "Mempelai Pria"]]
      : [["groom", groom, "Mempelai Pria"], ["bride", bride, "Mempelai Wanita"]];
  const show = C.show || {};
  const areas = show.seating !== false && C.seating && C.seating.areas ? C.seating.areas : [];
  const events = (E.list || []).slice(0, 3);
  const idx = Number.isInteger(C.maps && C.maps.eventIndex) ? C.maps.eventIndex : events.length - 1;
  const locEvent = events[idx] || events[0] || {};

  window.Inv = { C, E, esc, pad, dateParts, fullDate, people, locEvent, events, areas, show, main: dateParts(E.start), groom, bride };
})();
