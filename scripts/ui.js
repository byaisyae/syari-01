/* Interaksi halaman: cover, nama tamu, kelopak, animasi muncul, navigasi, hitung mundur, kalender, toast. */
(() => {
  "use strict";
  const { C, E, esc, people, locEvent, main } = window.Inv;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const el = {
    loader: $(".page-loader"),
    cover: $("#cover"),
    openButton: $("#openInvitation"),
    guestName: $("#guestName"),
    petalField: $("#petalField"),
    saveDate: $("#saveDate"),
    backToTop: $("#backToTop"),
    toast: $("#toast"),
  };

  /* ---------- toast ---------- */
  let toastTimer;
  window.showToast = (message) => {
    if (!el.toast) return;
    clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("show");
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 3200);
  };

  /* ---------- cover & nama tamu (?to=Nama) ---------- */
  const guestFromUrl = () => {
    const p = new URLSearchParams(location.search);
    const g = (p.get("to") || p.get("kepada") || "Bapak/Ibu/Saudara/i").replace(/[<>]/g, "").trim().slice(0, 80);
    return g || "Bapak/Ibu/Saudara/i";
  };
  const open = () => {
    el.cover?.classList.add("is-open");
    document.body.classList.remove("locked");
    document.body.classList.add("invitation-open");
  };
  const initCover = () => {
    if (el.guestName) el.guestName.textContent = guestFromUrl();
    el.openButton?.addEventListener("click", () => {
      open();
      sessionStorage.setItem("invitationOpened", "true");
      window.Music?.play();
      setTimeout(() => $("#home")?.focus?.(), 900);
    });
    if (sessionStorage.getItem("invitationOpened") === "true") open();
  };

  /* ---------- kelopak ---------- */
  const createPetals = () => {
    if (!el.petalField || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = innerWidth < 680 ? 18 : 34;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--size", `${8 + Math.random() * 13}px`);
      p.style.setProperty("--duration", `${10 + Math.random() * 12}s`);
      p.style.setProperty("--delay", `${-Math.random() * 18}s`);
      p.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      p.style.setProperty("--opacity", `${0.35 + Math.random() * 0.55}`);
      frag.appendChild(p);
    }
    el.petalField.appendChild(frag);
  };

  /* ---------- hitung mundur ---------- */
  const initCountdown = () => {
    const t = {
      days: $("#days"), hours: $("#hours"), minutes: $("#minutes"), seconds: $("#seconds"),
    };
    const target = new Date(E.start).getTime();
    if (!Number.isFinite(target) || !t.days) return;
    const pad = (v) => String(v).padStart(2, "0");
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      const day = 864e5, hour = 36e5, min = 6e4;
      t.days.textContent = pad(Math.floor(d / day));
      t.hours.textContent = pad(Math.floor((d % day) / hour));
      t.minutes.textContent = pad(Math.floor((d % hour) / min));
      t.seconds.textContent = pad(Math.floor((d % min) / 1000));
    };
    tick();
    setInterval(tick, 1000);
  };

  /* ---------- simpan ke kalender (.ics) ---------- */
  const icsDate = (v) => new Date(v).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsText = (s = "") => String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const downloadCalendar = () => {
    const [a, b] = people.map(([, p]) => p.nick || p.name);
    const title = `Pernikahan ${a} & ${b}`;
    const desc = `Undangan pernikahan ${people.map(([, p]) => p.name).join(" dan ")}.`;
    const place = [locEvent.venue, locEvent.address].filter(Boolean).join(", ");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//ID", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invitation`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(E.start)}`,
      `DTEND:${icsDate(E.end || E.start)}`,
      `SUMMARY:${icsText(title)}`, `DESCRIPTION:${icsText(desc)}`, `LOCATION:${icsText(place)}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const slug = `${a}-${b}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const link = Object.assign(document.createElement("a"), { href: url, download: `pernikahan-${slug}-${main.iso}.ics` });
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    window.showToast("Tanggal berhasil disiapkan untuk kalender.");
  };

  /* ---------- animasi muncul ---------- */
  const initReveal = () => {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) return items.forEach((i) => i.classList.add("visible"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            obs.unobserve(en.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -35px" },
    );
    items.forEach((item, i) => {
      item.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
      obs.observe(item);
    });
  };

  /* ---------- navigasi melayang & tombol ke atas ---------- */
  const initNavigation = () => {
    const links = $$(".floating-nav a");
    const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
    const update = () => {
      const pos = scrollY + innerHeight * 0.35;
      let cur = sections[0]?.id;
      sections.forEach((s) => {
        if (pos >= s.offsetTop) cur = s.id;
      });
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${cur}`));
      el.backToTop?.classList.toggle("visible", scrollY > 700);
    };
    addEventListener("scroll", update, { passive: true });
    update();
    el.backToTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  };

  /* ---------- efek riak pada tombol ---------- */
  const initRipple = () =>
    $$(".ripple").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const c = document.createElement("span");
        const d = Math.max(btn.clientWidth, btn.clientHeight);
        const r = btn.getBoundingClientRect();
        c.className = "ripple-effect";
        c.style.width = c.style.height = `${d}px`;
        c.style.left = `${e.clientX - r.left - d / 2}px`;
        c.style.top = `${e.clientY - r.top - d / 2}px`;
        btn.querySelector(".ripple-effect")?.remove();
        btn.appendChild(c);
      }),
    );

  initCover();
  createPetals();
  initReveal();
  initNavigation();
  initRipple();
  initCountdown();
  el.saveDate?.addEventListener("click", downloadCalendar);
  addEventListener("load", () => setTimeout(() => el.loader?.classList.add("hidden"), 380));
})();
