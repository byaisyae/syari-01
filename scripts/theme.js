/* Tema warna: membuat seluruh palet dari satu warna utama (CONFIG.theme.primary).
   Palet bawaan (pink) dipakai sebagai "cetakan" tingkat terang-gelapnya, lalu hue & saturasi disesuaikan dengan warna pilihan. */
(() => {
  "use strict";

  const BASE = { 950: "#5f1836", 900: "#7a2447", 800: "#96375d", 700: "#b84973", 600: "#d85d8e", 500: "#f176a7", 400: "#f793bb", 300: "#fbb7d0", 200: "#ffd2e2", 100: "#ffe7f0", 50: "#fff6fa" };
  const BASE_INK = "#3b2130", BASE_MUTED = "#7e6270", BASE_SOFT = "#654557", BASE_CREAM = "#fffaf5";

  const hexToRgb = (hex) => {
    let h = String(hex).replace("#", "").trim();
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  };
  const rgbToHsl = ([r, g, b]) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  };
  const hslToRgb = ([h, s, l]) => {
    h = ((h % 360) + 360) % 360 / 360;
    if (s === 0) return [l, l, l].map((v) => Math.round(v * 255));
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    const f = (t) => {
      t = (t + 1) % 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(v * 255));
  };
  const toHex = (rgb) => "#" + rgb.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");

  // geser hue & saturasi warna cetakan mengikuti warna utama, tingkat terang (lightness) dipertahankan
  const shift = (hex, dh, sr) => {
    const [h, s, l] = rgbToHsl(hexToRgb(hex));
    return hslToRgb([h + dh, Math.min(1, s * sr), l]);
  };

  function applyTheme(primary) {
    const rgb = hexToRgb(primary);
    if (!rgb) return;
    const [bh, bs] = rgbToHsl(hexToRgb(BASE[500]));
    const [ph, ps] = rgbToHsl(rgb);
    const dh = ph - bh;
    const sr = bs ? ps / bs : 1;
    const root = document.documentElement.style;
    const set = (name, value) => {
      root.setProperty(`--${name}`, toHex(value));
      root.setProperty(`--${name}-rgb`, value.join(", "));
    };
    Object.entries(BASE).forEach(([k, hex]) => {
      // tingkat 500 = warna pilihan persis
      set(`primary-${k}`, k === "500" ? rgb : shift(hex, dh, sr));
    });
    const ink = shift(BASE_INK, dh, sr);
    set("ink", ink);
    root.setProperty("--muted", toHex(shift(BASE_MUTED, dh, sr)));
    root.setProperty("--ink-soft", toHex(shift(BASE_SOFT, dh, sr)));
    root.setProperty("--cream", toHex(shift(BASE_CREAM, dh, sr * 0.6)));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", toHex(rgb));
  }

  const cfg = window.CONFIG || {};
  if (cfg.theme && cfg.theme.primary) applyTheme(cfg.theme.primary);
})();
