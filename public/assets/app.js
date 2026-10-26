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
    { title: 'Home', kind: 'Page', href: 'index' },
    { title: 'Plain-English Glossary', kind: 'Page', href: 'glossary' },
    { title: 'PDF Tools', kind: 'Category', href: 'pdf-tools' },
    { title: 'Image Tools', kind: 'Category', href: 'image-tools' },
    { title: 'Calculators', kind: 'Category', href: 'calculators' },
    { title: 'Text and Developer Tools', kind: 'Category', href: 'text-and-developer-tools' },
    { title: 'Image Compressor', kind: 'Tool', href: 'tools/image-compressor' },
    { title: 'Word Counter', kind: 'Tool', href: 'tools/word-counter' },
    { title: 'Data File Formatter', kind: 'Tool', href: 'tools/json-formatter' },
    { title: 'Text to Code Converter (Base64)', kind: 'Tool', href: 'tools/base64' },
    { title: 'Case Converter', kind: 'Tool', href: 'tools/case-converter' },
    { title: 'Password Generator', kind: 'Tool', href: 'tools/password-generator' },
    { title: 'BMI Calculator', kind: 'Tool', href: 'tools/bmi-calculator' },
    { title: 'PSD to PNG / JPG Converter', kind: 'Tool', href: 'tools/psd-converter' },
    { title: 'Unit Converter', kind: 'Tool', href: 'tools/unit-converter' },
    { title: 'Colour Code Converter', kind: 'Tool', href: 'tools/color-converter' },
    { title: 'Date Calculator', kind: 'Tool', href: 'tools/date-calculator' },
    { title: 'Percentage Calculator', kind: 'Tool', href: 'tools/percentage-calculator' },
    { title: 'QR Code Generator', kind: 'Tool', href: 'tools/qr-code-generator' },
    { title: 'File Fingerprint Generator', kind: 'Tool', href: 'tools/hash-generator' },
    { title: 'Loan Payment Calculator', kind: 'Tool', href: 'tools/loan-calculator' },
    { title: 'Placeholder Text Generator', kind: 'Tool', href: 'tools/lorem-ipsum-generator' },
    { title: 'Online Stopwatch', kind: 'Tool', href: 'tools/stopwatch' },
    { title: 'Image Resizer', kind: 'Tool', href: 'tools/image-resizer' },
    { title: 'Image Converter', kind: 'Tool', href: 'tools/image-converter' },
    { title: 'Age Calculator', kind: 'Tool', href: 'tools/age-calculator' },
    { title: 'Text Diff Checker', kind: 'Tool', href: 'tools/text-diff-checker' },
    { title: 'Discount Calculator', kind: 'Tool', href: 'tools/discount-calculator' },
    { title: "Tip Calculator", kind: 'Tool', href: 'tools/tip-calculator' },
    { title: "Random Number Generator", kind: 'Tool', href: 'tools/random-number-generator' },
    { title: "Web Address Text Converter", kind: 'Tool', href: 'tools/url-encoder' },
    { title: "Compound Interest Calculator", kind: 'Tool', href: 'tools/compound-interest-calculator' },
    { title: "Monthly Investment Calculator", kind: 'Tool', href: 'tools/sip-calculator' },
    { title: "Sales Tax and VAT Calculator", kind: 'Tool', href: 'tools/sales-tax-vat-calculator' },
    { title: "Computer Date Converter", kind: 'Tool', href: 'tools/unix-timestamp-converter' },
    { title: "Web Page Name Maker", kind: 'Tool', href: 'tools/url-slug-generator' },
    { title: "Image to Code Converter", kind: 'Tool', href: 'tools/image-to-base64' },
    { title: "Roman Numeral Converter", kind: 'Tool', href: 'tools/roman-numeral-converter' },
    { title: "Text Pattern Tester", kind: 'Tool', href: 'tools/regex-tester' },
    { title: "Typing Speed Test", kind: 'Tool', href: 'tools/typing-speed-test' },
    { title: "Spreadsheet to Data File Converter", kind: 'Tool', href: 'tools/csv-to-json' },
    { title: "Simple Text Formatting Preview", kind: 'Tool', href: 'tools/markdown-preview' },
    { title: "Password Strength Checker", kind: 'Tool', href: 'tools/password-strength-checker' },
    { title: "Fraction Calculator", kind: 'Tool', href: 'tools/fraction-calculator' },
    { title: "Speed, Distance and Time Calculator", kind: 'Tool', href: 'tools/speed-distance-time-calculator' },
    { title: "Salary to Hourly Pay Converter", kind: 'Tool', href: 'tools/salary-to-hourly-converter' },
    { title: "Time Duration Calculator", kind: 'Tool', href: 'tools/time-duration-calculator' },
    { title: "Number System Converter", kind: 'Tool', href: 'tools/number-base-converter' },
    { title: "Simple Interest Calculator", kind: 'Tool', href: 'tools/simple-interest-calculator' },
    { title: "Running Pace Calculator", kind: 'Tool', href: 'tools/running-pace-calculator' },
    { title: "Remove Duplicate Lines", kind: 'Tool', href: 'tools/remove-duplicate-lines' },
    { title: "Dice Roller", kind: 'Tool', href: 'tools/dice-roller' },
    { title: "Mean, Median and Mode Calculator", kind: 'Tool', href: 'tools/mean-median-mode-calculator' },
    { title: "Fuel Economy Converter", kind: 'Tool', href: 'tools/fuel-economy-converter' },
    { title: "Text to Speech", kind: 'Tool', href: 'tools/text-to-speech' },
    { title: "File Size Converter", kind: 'Tool', href: 'tools/data-size-converter' },
    { title: "Download Time Calculator", kind: 'Tool', href: 'tools/download-time-calculator' },
    { title: "Text Readability Checker", kind: 'Tool', href: 'tools/color-contrast-checker' },
    { title: "What Is Text Readability? WCAG Ratios Explained", kind: 'Guide', href: 'guides/what-is-colour-contrast-and-why-it-matters' },
    { title: "Bits and Bytes: Why Internet Speeds Look Different From File Sizes", kind: 'Guide', href: 'guides/bits-vs-bytes-why-internet-speeds-use-bits' },
    { title: "How to Estimate How Long a Download Takes", kind: 'Guide', href: 'guides/how-to-estimate-how-long-a-download-takes' },
    { title: "Mean, Median and Mode: Which Average Should You Use?", kind: 'Guide', href: 'guides/mean-median-and-mode-explained' },
    { title: "How to Convert MPG to Litres per 100 km", kind: 'Guide', href: 'guides/how-to-convert-mpg-to-litres-per-100km' },
    { title: "How Text to Speech Works in Your Browser", kind: 'Guide', href: 'guides/how-text-to-speech-works-in-your-browser' },
    { title: "How to Calculate Running Pace (and Convert It to Speed)", kind: 'Guide', href: 'guides/how-to-calculate-running-pace' },
    { title: "How to Remove Duplicate Lines from a List", kind: 'Guide', href: 'guides/how-to-remove-duplicate-lines-from-a-list' },
    { title: "Are Dice Rolls Really Random? How Fair Randomness Works", kind: 'Guide', href: 'guides/are-dice-rolls-random' },
    { title: "How to Calculate the Time Between Two Times", kind: 'Guide', href: 'guides/how-to-calculate-time-between-two-times' },
    { title: "Computer Number Systems Explained (Binary and Hex)", kind: 'Guide', href: 'guides/binary-decimal-and-hexadecimal-explained' },
    { title: "Simple vs Compound Interest: What Is the Difference?", kind: 'Guide', href: 'guides/simple-vs-compound-interest' },
    { title: "How to Add and Subtract Fractions", kind: 'Guide', href: 'guides/how-to-add-and-subtract-fractions' },
    { title: "How Speed, Distance and Time Are Related", kind: 'Guide', href: 'guides/how-speed-distance-and-time-are-related' },
    { title: "How to Convert a Salary to an Hourly Rate", kind: 'Guide', href: 'guides/how-to-convert-a-salary-to-an-hourly-rate' },
    { title: "Spreadsheet Files vs Data Files: Which to Use?", kind: 'Guide', href: 'guides/csv-vs-json-which-to-use' },
    { title: "What Is Simple Text Formatting (Markdown)? A Plain Guide", kind: 'Guide', href: 'guides/what-is-markdown' },
    { title: "How to Check Password Strength (and What the Scores Miss)", kind: 'Guide', href: 'guides/how-to-check-password-strength' },
    { title: "How Roman Numerals Work", kind: 'Guide', href: 'guides/how-roman-numerals-work' },
    { title: "What Is a Text Pattern? A Plain Guide", kind: 'Guide', href: 'guides/what-is-a-regular-expression' },
    { title: "How to Measure Your Typing Speed and Accuracy", kind: 'Guide', href: 'guides/how-to-measure-your-typing-speed' },
    { title: "How a SIP (Monthly Investment Plan) Works", kind: 'Guide', href: 'guides/how-a-sip-works' },
    { title: "How Sales Tax and VAT Are Calculated: Adding and Removing Tax", kind: 'Guide', href: 'guides/how-gst-is-calculated' },
    { title: "What Is a Computer Date Number? A Plain Guide", kind: 'Guide', href: 'guides/what-is-a-unix-timestamp' },
    { title: "What Is Web Address Text Encoding? A Plain Guide", kind: 'Guide', href: 'guides/what-is-url-encoding-and-percent-encoding' },
    { title: "How Compound Interest Works, With a Worked Example", kind: 'Guide', href: 'guides/how-compound-interest-works' },
    { title: "How to Split a Bill Fairly, Including the Tip", kind: 'Guide', href: 'guides/how-to-split-a-bill-fairly' },
    { title: "How to Compare Two Texts for Differences", kind: 'Guide', href: 'guides/how-to-compare-two-texts-for-differences' },
    { title: "How to Calculate a Discount and Sale Price", kind: 'Guide', href: 'guides/how-to-calculate-a-discount-and-sale-price' },
    { title: 'Merge PDF', kind: 'Tool', href: 'tools/merge-pdf' },
    { title: 'Split PDF', kind: 'Tool', href: 'tools/split-pdf' },
    { title: 'Rotate PDF', kind: 'Tool', href: 'tools/rotate-pdf' },
    { title: 'JPG and PNG to PDF', kind: 'Tool', href: 'tools/image-to-pdf' },
    { title: 'PDF to JPG', kind: 'Tool', href: 'tools/pdf-to-jpg' },
    { title: 'Video to MP3', kind: 'Tool', href: 'tools/video-to-mp3' },
    { title: 'How QR Codes Work and How to Make a Good One', kind: 'Guide', href: 'guides/how-qr-codes-work' },
    { title: 'How to Verify a Download with a Hash', kind: 'Guide', href: 'guides/how-to-verify-a-file-with-a-hash' },
    { title: 'How a Loan EMI Is Calculated', kind: 'Guide', href: 'guides/how-a-loan-emi-is-calculated' },
    { title: 'What Is Lorem Ipsum?', kind: 'Guide', href: 'guides/what-is-lorem-ipsum' },
    { title: 'How to Resize an Image to a Specific File Size', kind: 'Guide', href: 'guides/how-to-resize-an-image-to-a-file-size' },
    { title: 'How to Convert JPG to WebP (and Back)', kind: 'Guide', href: 'guides/how-to-convert-jpg-to-webp' },
    { title: 'Is It Safe to Merge PDF Files Online?', kind: 'Guide', href: 'guides/is-it-safe-to-merge-pdf-files-online' },
    { title: 'How to Convert Video to MP3 (Safely and Legally)', kind: 'Guide', href: 'guides/how-to-convert-video-to-mp3' },
    { title: 'How to Calculate Your Exact Age in Years, Months and Days', kind: 'Guide', href: 'guides/how-to-calculate-your-exact-age' },
    { title: 'Lossy vs Lossless Compression: What Changes in Your Images', kind: 'Guide', href: 'guides/lossy-vs-lossless-compression-explained' },
    { title: 'How to Time Tasks with a Stopwatch', kind: 'Guide', href: 'guides/how-to-time-tasks-with-a-stopwatch' },
    { title: 'Guides', kind: 'Page', href: 'guides' },
    { title: 'How to Compress Images for the Web', kind: 'Guide', href: 'guides/how-to-compress-images-for-the-web' },
    { title: 'How to Count Words and Estimate Reading Time', kind: 'Guide', href: 'guides/how-to-count-words-and-reading-time' },
    { title: 'How to Format and Validate JSON', kind: 'Guide', href: 'guides/how-to-format-and-validate-json' },
    { title: 'What Is Base64? A Plain Guide to Text Codes', kind: 'Guide', href: 'guides/what-is-base64-and-when-to-use-it' },
    { title: 'Text Case Styles Explained', kind: 'Guide', href: 'guides/text-case-styles-explained' },
    { title: 'How to Create a Strong Password', kind: 'Guide', href: 'guides/how-to-create-a-strong-password' },
    { title: 'Understanding BMI and Its Limits', kind: 'Guide', href: 'guides/understanding-bmi-and-its-limits' },
    { title: 'How to Convert PSD Files to PNG or JPG', kind: 'Guide', href: 'guides/how-to-convert-psd-files-to-png-or-jpg' },
    { title: 'Metric and Imperial Conversions Explained', kind: 'Guide', href: 'guides/metric-and-imperial-conversions-explained' },
    { title: 'Colour Codes Explained: HEX, RGB and HSL', kind: 'Guide', href: 'guides/hex-rgb-and-hsl-color-codes-explained' },
    { title: 'How to Count Days Between Two Dates', kind: 'Guide', href: 'guides/how-to-count-days-between-two-dates' },
    { title: 'How to Calculate Percentages', kind: 'Guide', href: 'guides/how-to-calculate-percentages' },
    { title: 'About', kind: 'Page', href: 'about' },
    { title: 'Privacy Policy', kind: 'Page', href: 'privacy' },
    { title: 'Contact', kind: 'Page', href: 'contact' }
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

  /* ---------- Shared tool actions: Reset and Copy results ---------- */
  document.querySelectorAll('.panel').forEach(function (panel) {
    var stats = panel.querySelector('.stats');
    if (stats) { stats.setAttribute('role', 'status'); stats.setAttribute('aria-live', 'polite'); }

    // Tools with a file picker keep their file, so skip Reset there.
    var hasFile = !!panel.querySelector('input[type=file]');
    var fields = Array.prototype.slice.call(panel.querySelectorAll('input, select, textarea'))
      .filter(function (el) { return el.type !== 'file' && el.type !== 'button' && el.id !== 'filter'; });
    var row = document.createElement('div');
    row.className = 'row tool-actions';

    if (fields.length && !hasFile) {
      var start = fields.map(function (el) { return [el, el.type === 'checkbox' ? el.checked : el.value]; });
      var reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'secondary';
      reset.textContent = 'Reset';
      reset.addEventListener('click', function () {
        start.forEach(function (pair) {
          var el = pair[0], v = pair[1];
          if (el.type === 'checkbox') el.checked = v; else el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });
        toast('Reset to the starting values');
      });
      row.appendChild(reset);
    }

    if (stats && stats.querySelector('.stat')) {
      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'secondary';
      copy.textContent = 'Copy results';
      copy.addEventListener('click', function () {
        var lines = Array.prototype.slice.call(stats.querySelectorAll('.stat')).filter(function (st) {
          return !st.closest('[hidden]');
        }).map(function (st) {
          return st.querySelector('span').textContent + ': ' + st.querySelector('strong').textContent;
        });
        if (lines.length && navigator.clipboard) navigator.clipboard.writeText(lines.join('\n')).catch(function () {});
      });
      row.appendChild(copy);
    }

    if (row.childNodes.length) panel.appendChild(row);
  });

  paintThemeButtons();
})();
