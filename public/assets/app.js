(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'qth-theme';
  var inSubfolder = /\/(tools|guides)\//.test(location.pathname);
  var prefix = inSubfolder ? '../' : '';

  /* ---------- Storage helpers (private mode can throw) ---------- */
  function readStored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStored(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ---------- Theme ---------- */
  var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function effectiveTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function paintThemeButtons() {
    var mode = effectiveTheme();
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.innerHTML = mode === 'dark' ? SUN : MOON;
      btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', mode === 'dark' ? 'Light theme' : 'Dark theme');
    });
  }

  var saved = readStored(THEME_KEY);
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    writeStored(THEME_KEY, next);
    paintThemeButtons();
  });

  /* ---------- Toast ---------- */
  var toastEl = null;
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }
  window.toast = toast;

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (btn && /^copy/i.test(btn.textContent.trim())) toast('Copied to clipboard');
  });

  /* ---------- Command palette (Ctrl/Cmd + K) ---------- */
  var ENTRIES = [
    { title: 'Home', kind: 'Page', href: 'index.html' },
    { title: 'Image Compressor', kind: 'Tool', href: 'tools/image-compressor.html' },
    { title: 'Word Counter', kind: 'Tool', href: 'tools/word-counter.html' },
    { title: 'JSON Formatter', kind: 'Tool', href: 'tools/json-formatter.html' },
    { title: 'Base64 Encoder', kind: 'Tool', href: 'tools/base64.html' },
    { title: 'Case Converter', kind: 'Tool', href: 'tools/case-converter.html' },
    { title: 'Password Generator', kind: 'Tool', href: 'tools/password-generator.html' },
    { title: 'BMI Calculator', kind: 'Tool', href: 'tools/bmi-calculator.html' },
    { title: 'PSD to PNG / JPG Converter', kind: 'Tool', href: 'tools/psd-converter.html' },
    { title: 'Unit Converter', kind: 'Tool', href: 'tools/unit-converter.html' },
    { title: 'Color Converter', kind: 'Tool', href: 'tools/color-converter.html' },
    { title: 'Date Calculator', kind: 'Tool', href: 'tools/date-calculator.html' },
    { title: 'Percentage Calculator', kind: 'Tool', href: 'tools/percentage-calculator.html' },
    { title: 'QR Code Generator', kind: 'Tool', href: 'tools/qr-code-generator.html' },
    { title: 'Hash Generator', kind: 'Tool', href: 'tools/hash-generator.html' },
    { title: 'Loan EMI Calculator', kind: 'Tool', href: 'tools/loan-calculator.html' },
    { title: 'Lorem Ipsum Generator', kind: 'Tool', href: 'tools/lorem-ipsum-generator.html' },
    { title: 'Online Stopwatch', kind: 'Tool', href: 'tools/stopwatch.html' },
    { title: 'Image Resizer', kind: 'Tool', href: 'tools/image-resizer.html' },
    { title: 'Image Converter', kind: 'Tool', href: 'tools/image-converter.html' },
    { title: 'Age Calculator', kind: 'Tool', href: 'tools/age-calculator.html' },
    { title: 'Merge PDF', kind: 'Tool', href: 'tools/merge-pdf.html' },
    { title: 'Split PDF', kind: 'Tool', href: 'tools/split-pdf.html' },
    { title: 'Rotate PDF', kind: 'Tool', href: 'tools/rotate-pdf.html' },
    { title: 'JPG and PNG to PDF', kind: 'Tool', href: 'tools/image-to-pdf.html' },
    { title: 'PDF to JPG', kind: 'Tool', href: 'tools/pdf-to-jpg.html' },
    { title: 'Video to MP3', kind: 'Tool', href: 'tools/video-to-mp3.html' },
    { title: 'How QR Codes Work and How to Make a Good One', kind: 'Guide', href: 'guides/how-qr-codes-work.html' },
    { title: 'How to Verify a Download with a Hash', kind: 'Guide', href: 'guides/how-to-verify-a-file-with-a-hash.html' },
    { title: 'How a Loan EMI Is Calculated', kind: 'Guide', href: 'guides/how-a-loan-emi-is-calculated.html' },
    { title: 'What Is Lorem Ipsum?', kind: 'Guide', href: 'guides/what-is-lorem-ipsum.html' },
    { title: 'How to Resize an Image to a Specific File Size', kind: 'Guide', href: 'guides/how-to-resize-an-image-to-a-file-size.html' },
    { title: 'How to Convert JPG to WebP (and Back)', kind: 'Guide', href: 'guides/how-to-convert-jpg-to-webp.html' },
    { title: 'Is It Safe to Merge PDF Files Online?', kind: 'Guide', href: 'guides/is-it-safe-to-merge-pdf-files-online.html' },
    { title: 'How to Convert Video to MP3 (Safely and Legally)', kind: 'Guide', href: 'guides/how-to-convert-video-to-mp3.html' },
    { title: 'How to Calculate Your Exact Age in Years, Months and Days', kind: 'Guide', href: 'guides/how-to-calculate-your-exact-age.html' },
    { title: 'Lossy vs Lossless Compression: What Changes in Your Images', kind: 'Guide', href: 'guides/lossy-vs-lossless-compression-explained.html' },
    { title: 'How to Time Tasks with a Stopwatch', kind: 'Guide', href: 'guides/how-to-time-tasks-with-a-stopwatch.html' },
    { title: 'Guides', kind: 'Page', href: 'guides.html' },
    { title: 'How to Compress Images for the Web', kind: 'Guide', href: 'guides/how-to-compress-images-for-the-web.html' },
    { title: 'How to Count Words and Estimate Reading Time', kind: 'Guide', href: 'guides/how-to-count-words-and-reading-time.html' },
    { title: 'How to Format and Validate JSON', kind: 'Guide', href: 'guides/how-to-format-and-validate-json.html' },
    { title: 'What Is Base64 and When Should You Use It?', kind: 'Guide', href: 'guides/what-is-base64-and-when-to-use-it.html' },
    { title: 'Text Case Styles Explained', kind: 'Guide', href: 'guides/text-case-styles-explained.html' },
    { title: 'How to Create a Strong Password', kind: 'Guide', href: 'guides/how-to-create-a-strong-password.html' },
    { title: 'Understanding BMI and Its Limits', kind: 'Guide', href: 'guides/understanding-bmi-and-its-limits.html' },
    { title: 'How to Convert PSD Files to PNG or JPG', kind: 'Guide', href: 'guides/how-to-convert-psd-files-to-png-or-jpg.html' },
    { title: 'Metric and Imperial Conversions Explained', kind: 'Guide', href: 'guides/metric-and-imperial-conversions-explained.html' },
    { title: 'HEX, RGB and HSL Color Codes Explained', kind: 'Guide', href: 'guides/hex-rgb-and-hsl-color-codes-explained.html' },
    { title: 'How to Count Days Between Two Dates', kind: 'Guide', href: 'guides/how-to-count-days-between-two-dates.html' },
    { title: 'How to Calculate Percentages', kind: 'Guide', href: 'guides/how-to-calculate-percentages.html' },
    { title: 'About', kind: 'Page', href: 'about.html' },
    { title: 'Privacy Policy', kind: 'Page', href: 'privacy.html' },
    { title: 'Contact', kind: 'Page', href: 'contact.html' }
  ];

  var palette = null;
  var paletteInput = null;
  var paletteList = null;
  var activeIndex = 0;
  var visible = [];

  function buildPalette() {
    palette = document.createElement('div');
    palette.className = 'palette';
    palette.hidden = true;
    palette.innerHTML =
      '<div class="palette-box" role="dialog" aria-modal="true" aria-label="Search the site">' +
        '<input class="palette-input" type="search" placeholder="Search tools and guides" aria-label="Search tools and guides" autocomplete="off">' +
        '<ul class="palette-list" role="listbox"></ul>' +
        '<div class="palette-foot"><span>Use arrow keys and Enter</span><span>Esc to close</span></div>' +
      '</div>';
    document.body.appendChild(palette);
    paletteInput = palette.querySelector('.palette-input');
    paletteList = palette.querySelector('.palette-list');

    palette.addEventListener('click', function (e) {
      if (e.target === palette) closePalette();
    });
    paletteInput.addEventListener('input', renderPalette);
    paletteInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter' && visible[activeIndex]) { window.location.href = prefix + visible[activeIndex].href; }
    });
  }

  function renderPalette() {
    var q = paletteInput.value.trim().toLowerCase();
    visible = ENTRIES.filter(function (entry) {
      return !q || entry.title.toLowerCase().indexOf(q) !== -1 || entry.kind.toLowerCase().indexOf(q) !== -1;
    });
    activeIndex = 0;
    paletteList.innerHTML = '';
    if (!visible.length) {
      var empty = document.createElement('li');
      empty.className = 'palette-empty';
      empty.textContent = 'No matches found';
      paletteList.appendChild(empty);
      return;
    }
    visible.forEach(function (entry, i) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.className = 'palette-item' + (i === 0 ? ' active' : '');
      var a = document.createElement('a');
      a.href = prefix + entry.href;
      a.innerHTML = '<span></span><em></em>';
      a.firstChild.textContent = entry.title;
      a.lastChild.textContent = entry.kind;
      li.appendChild(a);
      li.addEventListener('mouseenter', function () { setActive(i); });
      paletteList.appendChild(li);
    });
  }

  function setActive(i) {
    activeIndex = i;
    paletteList.querySelectorAll('.palette-item').forEach(function (li, idx) {
      li.classList.toggle('active', idx === i);
    });
  }

  function moveActive(step) {
    if (!visible.length) return;
    var next = (activeIndex + step + visible.length) % visible.length;
    setActive(next);
    var el = paletteList.querySelectorAll('.palette-item')[next];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function openPalette() {
    if (!palette) buildPalette();
    palette.hidden = false;
    requestAnimationFrame(function () { palette.classList.add('open'); });
    paletteInput.value = '';
    renderPalette();
    paletteInput.focus();
  }

  function closePalette() {
    if (!palette || palette.hidden) return;
    palette.classList.remove('open');
    setTimeout(function () { palette.hidden = true; }, 150);
  }

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette && !palette.hidden) closePalette(); else openPalette();
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-palette]')) openPalette();
  });

  /* ---------- Live filter on cards (home page) ---------- */
  var filterInput = document.getElementById('filter');
  if (filterInput) {
    var empty = document.getElementById('filter-empty');
    var groups = document.querySelectorAll('[data-filter-group]');
    filterInput.addEventListener('input', function () {
      var q = filterInput.value.trim().toLowerCase();
      var anyShown = false;
      document.querySelectorAll('[data-searchable]').forEach(function (card) {
        var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        card.hidden = !match;
        if (match) anyShown = true;
      });
      groups.forEach(function (group) {
        var visibleCards = group.querySelectorAll('[data-searchable]:not([hidden])').length;
        group.hidden = visibleCards === 0;
      });
      if (empty) empty.hidden = anyShown;
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal], .card, .panel, .article > *');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  paintThemeButtons();
})();
