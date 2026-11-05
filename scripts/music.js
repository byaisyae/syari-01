/* Musik latar: dibuat dari CONFIG.music. Mulai otomatis setelah interaksi pertama, berhenti saat tab disembunyikan. */
(() => {
  "use strict";
  const M = (window.CONFIG && window.CONFIG.music) || {};
  if (!M.src) {
    window.Music = { play() {} };
    return;
  }

  const audio = document.createElement("audio");
  audio.id = "backsound";
  audio.loop = true;
  audio.preload = "auto";
  audio.src = M.src;
  audio.volume = typeof M.volume === "number" ? M.volume : 0.45;

  const toggle = document.createElement("button");
  toggle.id = "musicToggle";
  toggle.className = "music-toggle";
  toggle.type = "button";
  toggle.textContent = "♪";
  toggle.setAttribute("aria-label", "Nyalakan musik");
  document.body.append(audio, toggle);

  let started = false;
  const mark = (on) => {
    toggle.classList.toggle("playing", on);
    toggle.textContent = on ? "♫" : "♪";
    toggle.setAttribute("aria-label", on ? "Matikan musik" : "Nyalakan musik");
  };
  const play = async () => {
    if (started) return;
    try {
      await audio.play();
      started = true;
      mark(true);
    } catch {
      /* menunggu interaksi pengunjung */
    }
  };
  const pause = () => {
    audio.pause();
    started = false;
    mark(false);
  };

  play();
  const events = ["click", "touchstart", "keydown"];
  const first = () => {
    play();
    events.forEach((n) => document.removeEventListener(n, first));
  };
  events.forEach((n) => document.addEventListener(n, first, { once: true }));

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    audio.paused ? play() : pause();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) audio.pause();
    else if (!document.hidden && started) audio.play().catch(() => {});
  });

  window.Music = { play };
})();
