/* Menyusun cover dan seluruh isi undangan dari CONFIG ke #app. Markup & class sama dengan desain awal. */
(() => {
  "use strict";
  const { C, E, esc, pad, dateParts, fullDate, people, locEvent, events, areas, main, show } = window.Inv;
  const link = (s, cls = "source-link") =>
    s && s.text ? `<cite><a class="${cls}" href="${esc(s.url || "#")}" target="_blank" rel="noopener noreferrer">${esc(s.text)} ↗</a></cite>` : "";
  const [n1, n2] = people.map(([, p]) => esc(p.nick || p.name || ""));

  /* ---------- cover ---------- */
  const cover = `
  <section class="cover" id="cover" aria-label="Sampul undangan">
    <div class="cover__mist"></div>
    <img class="cover__branch cover__branch--left" src="assets/sakura-branch.svg" alt="" />
    <img class="cover__branch cover__branch--right" src="assets/sakura-branch.svg" alt="" />
    <div class="cover__card glass-panel">
      <p class="eyebrow">Wedding Invitation</p>
      <div class="cover__date-mark" aria-label="${esc(main.day + " " + main.month + " " + main.year)}">
        <span>${main.dd}</span><i></i><span>${main.mm}</span><i></i><span>${main.yy}</span>
      </div>
      <h1><span>${n1}</span><b>&amp;</b><span>${n2}</span></h1>
      <p class="cover__subtitle">${esc(fullDate(main))}</p>
      <div class="guest-card">
        <small>Kepada Yth.</small>
        <strong id="guestName">Bapak/Ibu/Saudara/i</strong>
        <span>di tempat</span>
      </div>
      <button class="primary-button ripple" id="openInvitation" type="button">
        <span>Buka Undangan</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m0 0 6-6m-6 6-6-6"/></svg>
      </button>
    </div>
    <div class="scroll-hint" aria-hidden="true"><span></span></div>
  </section>`;

  /* ---------- navigasi ---------- */
  const navItems = [["home", "Beranda"], ["acara", "Acara"]];
  if (show.dalil !== false && C.dalil?.items?.length) navItems.push(["dalil", "Dalil"]);
  if (show.location !== false) navItems.push(["lokasi", "Lokasi"]);
  if (show.rsvp !== false) navItems.push(["rsvp", "RSVP"]);
  const nav = `<nav class="floating-nav" aria-label="Navigasi utama">${navItems.map(([id, t]) => `<a href="#${id}" aria-label="${t}">${t}</a>`).join("")}</nav>`;

  /* ---------- bagian-bagian ---------- */
  const hero = `
    <section class="hero section" id="home">
      <div class="hero__landscape" aria-hidden="true"></div>
      <div class="hero__veil"></div>
      <div class="hero__content reveal">
        ${C.hero?.basmalah ? `<p class="basmalah" lang="ar" dir="rtl">${esc(C.hero.basmalah)}</p>` : ""}
        <p class="eyebrow">${esc(C.hero?.kicker || "")}</p>
        <h2>${n1} <span>&amp;</span> ${n2}</h2>
        <p class="hero__intro">${esc(C.hero?.intro || "")}</p>
        <div class="hero__date">
          <span>${esc(main.weekday)}</span>
          <strong>${main.day}</strong>
          <span>${esc(main.month + " " + main.year)}</span>
        </div>
        <a class="ghost-button" href="#acara">Lihat Detail Acara</a>
      </div>
    </section>`;

  const v = C.verse || {};
  const verse = v.arabic || v.translation ? `
    <section class="verse-highlight section section--cream">
      <div class="section-heading reveal">
        <span class="section-kicker">${esc(v.kicker || "")}</span>
        <h2>${esc(v.title || "")}</h2>
      </div>
      <article class="quran-card reveal">
        <div class="quran-card__ornament">✿</div>
        ${v.arabic ? `<p class="arabic" lang="ar" dir="rtl">${esc(v.arabic)}</p>` : ""}
        <p class="translation">“${esc(v.translation || "")}”</p>
        ${link(v.source)}
      </article>
    </section>` : "";

  const igIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  const personCard = ([, p, label], i) => {
    const ig = String(p.ig || "").replace(/^@/, "").trim();
    const parents = [p.father, p.mother].filter(Boolean).map((x) => `<strong>${esc(x)}</strong>`).join("<span>&amp;</span>");
    return `
        <article class="person-card reveal ${i ? "reveal--right" : "reveal--left"}">
          <span class="person-card__label">${label}</span>
          <h3>${esc(p.name || "")}</h3>
          ${parents ? `<p>${esc(p.relation || "")}</p>${parents}` : ""}
          ${ig ? `<a class="person-card__ig" href="https://instagram.com/${encodeURIComponent(ig)}" target="_blank" rel="noopener noreferrer">${igIcon}@${esc(ig)}</a>` : ""}
        </article>`;
  };
  const couple = `
    <section class="couple section" id="mempelai">
      <img class="section-branch section-branch--left" src="assets/sakura-branch.svg" alt="" aria-hidden="true" />
      <div class="section-heading reveal">
        <span class="section-kicker">${esc(C.couplePage?.kicker || "")}</span>
        <h2>${esc(C.couplePage?.title || "")}</h2>
        <p>${esc(C.couplePage?.text || "")}</p>
      </div>
      <div class="couple-grid">${people.map(personCard).join("")}
      </div>
    </section>`;

  const countdown = `
    <section class="countdown section section--primary" aria-label="Hitung mundur acara">
      <div class="section-heading section-heading--light reveal">
        <span class="section-kicker">Menuju Hari Bahagia</span>
        <h2>${esc(main.day + " " + main.month + " " + main.year)}</h2>
      </div>
      <div class="countdown-grid reveal" id="countdown">
        <div><strong id="days">00</strong><span>Hari</span></div>
        <div><strong id="hours">00</strong><span>Jam</span></div>
        <div><strong id="minutes">00</strong><span>Menit</span></div>
        <div><strong id="seconds">00</strong><span>Detik</span></div>
      </div>
      <button class="light-button ripple reveal" id="saveDate" type="button">Simpan ke Kalender</button>
    </section>`;

  const eventCard = (e, i) => {
    const p = dateParts(e.date || E.start);
    const featured = events.length > 1 && i === 1;
    return `
        <article class="event-card ${featured ? "event-card--featured " : ""}reveal ${i % 2 ? "reveal--right" : "reveal--left"}">
          <div class="event-card__number">${pad(i + 1)}</div>
          <p class="event-card__type">${esc(e.type || "")}</p>
          <h3>${esc(fullDate(p))}</h3>
          <dl>
            <div><dt>Waktu</dt><dd>${esc(e.time || "")}</dd></div>
            <div><dt>Tempat</dt><dd>${esc(e.venue || "")}</dd></div>
            <div><dt>Alamat</dt><dd>${esc(e.address || "")}</dd></div>
          </dl>
        </article>`;
  };
  const eventsSec = `
    <section class="events section" id="acara">
      <div class="section-heading reveal">
        <span class="section-kicker">InsyaAllah Dilaksanakan</span>
        <h2>Rangkaian Acara</h2>
      </div>
      <div class="event-grid">${events.map(eventCard).join("")}
      </div>
    </section>`;

  const seating = areas.length ? `
    <section class="seating section section--soft" id="area-tamu">
      <div class="section-heading reveal">
        <span class="section-kicker">Kenyamanan &amp; Adab</span>
        <h2>Pengaturan Area Tamu</h2>
        <p>${esc(C.seating?.text || "")}</p>
      </div>
      <div class="seating-layout reveal">
        ${areas.map((a, i) => `${i === 1 ? '<div class="seating-divider"><span>||||||||||||||||||||||||||||||</span></div>' : ""}
        <div class="seating-card seating-card--${["men", "women", "general"][i] || "general"}">
          <span class="seating-card__symbol" aria-hidden="true">${["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"][i] || i + 1}</span>
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.text || "")}</p>
        </div>`).join("")}
      </div>
    </section>` : "";

  const d = C.dalil || {};
  const dalil = show.dalil !== false && d.items?.length ? `
    <section class="dalil section" id="dalil">
      <div class="section-heading reveal">
        <h2>${esc(d.title || "")}</h2>
        <p>${esc(d.text || "")}</p>
      </div>
      <div class="dalil-grid">${d.items.map((it) => `
        <article class="dalil-card reveal">
          <span class="dalil-card__tag">${esc(it.tag || "")}</span>
          ${it.arabic ? `<p class="arabic" lang="ar" dir="rtl">${esc(it.arabic)}</p>` : ""}
          <p>“${esc(it.translation || "")}”</p>
          ${link(it.source)}
        </article>`).join("")}
      </div>
    </section>` : "";

  const ad = C.adab || {};
  const adab = show.adab !== false && ad.items?.length ? `
    <section class="adab section section--tint">
      <div class="section-heading reveal">
        <span class="section-kicker">${esc(ad.kicker || "")}</span>
        <h2>${esc(ad.title || "")}</h2>
      </div>
      <div class="adab-list">${ad.items.map((it, i) => `
        <article class="adab-item reveal"><span>${pad(i + 1)}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.text || "")}</p></div></article>`).join("")}
      </div>
    </section>` : "";

  const mq = encodeURIComponent(C.maps?.query || locEvent.address || "");
  const mapLink = C.maps?.link || `https://www.google.com/maps/search/?api=1&query=${mq}`;
  const location = show.location !== false ? `
    <section class="location section" id="lokasi">
      <div class="section-heading reveal">
        <span class="section-kicker">Petunjuk Arah</span>
        <h2>Lokasi Acara</h2>
        <p>${esc([locEvent.venue, locEvent.address].filter(Boolean).join(", "))}</p>
      </div>
      <div class="map-shell reveal">
        <iframe id="mapFrame" title="Peta lokasi pernikahan" src="https://www.google.com/maps?q=${mq}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <div class="map-overlay-card">
          <span>Lokasi ${esc(locEvent.type || "Acara")}</span>
          <strong>${esc(locEvent.venue || "")}</strong>
          <p>${esc(locEvent.address || "")}</p>
          <a class="primary-button" href="${esc(mapLink)}" target="_blank" rel="noopener noreferrer">Buka Google Maps</a>
        </div>
      </div>
    </section>` : "";

  const R = C.rsvp || {};
  const max = Math.max(1, Math.min(20, R.maxGuests || 4));
  const rsvp = show.rsvp !== false ? `
    <section class="rsvp section section--soft" id="rsvp">
      <div class="section-heading reveal">
        <span class="section-kicker">Konfirmasi Kehadiran</span>
        <h2>RSVP</h2>
        <p>Mohon konfirmasi agar kami dapat mempersiapkan penyambutan dengan lebih baik.</p>
      </div>
      <form class="rsvp-form reveal" id="rsvpForm">
        <label><span>Nama</span><input id="rsvpName" name="name" type="text" autocomplete="name" placeholder="Nama lengkap" required /></label>
        <label><span>Kehadiran</span>
          <select id="attendance" name="attendance" required>
            <option value="">Pilih konfirmasi</option>
            ${(R.attendance || []).map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
          </select>
        </label>
        <label><span>Jumlah Tamu</span>
          <select id="guestCount" name="guestCount" required>
            ${Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1} orang</option>`).join("")}
          </select>
        </label>
        ${areas.length ? `<label><span>Pilihan Area</span>
          <select id="guestArea" name="guestArea" required>
            ${areas.map((a) => `<option value="${esc(a.title)}">${esc(a.title)}</option>`).join("")}
          </select>
        </label>` : ""}
        <label class="form-wide"><span>Doa &amp; Ucapan</span><textarea id="wishes" name="wishes" rows="4" placeholder="Tuliskan doa terbaik untuk kedua mempelai"></textarea></label>
        <button class="primary-button ripple form-wide" type="submit">Kirim Konfirmasi via WhatsApp</button>
        <p class="form-status form-wide" id="formStatus" role="status"></p>
      </form>
    </section>` : "";

  const cl = C.closing || {};
  const closing = `
    <section class="closing section">
      <img class="section-branch section-branch--right" src="assets/sakura-branch.svg" alt="" aria-hidden="true" />
      <div class="closing__content reveal">
        ${cl.arabic ? `<p class="arabic dua" lang="ar" dir="rtl">${esc(cl.arabic)}</p>` : ""}
        ${cl.latin ? `<p class="dua-latin">${esc(cl.latin)}</p>` : ""}
        ${cl.meaning ? `<p class="dua-meaning">“${esc(cl.meaning)}”</p>` : ""}
        ${link(cl.source, "source-link source-light")}
        <h2>${esc(cl.title || "")}</h2>
        <p>${esc(cl.text || "")}</p>
        <div class="closing__names">${n1} <b>&amp;</b> ${n2}</div>
        <time datetime="${main.iso}">${main.dd} • ${main.mm} • ${main.year}</time>
      </div>
    </section>`;

  const app = document.getElementById("app");
  if (app) app.innerHTML = `${cover}
  <main id="mainContent">
    ${nav}${hero}${verse}${couple}${countdown}${eventsSec}${seating}${dalil}${adab}${location}${rsvp}${closing}
  </main>`;

  if (C.meta?.title) document.title = C.meta.title;
})();
