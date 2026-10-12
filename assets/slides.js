/*
 * Slayd dvigateli.
 *
 * Ishlatilishi:
 *   <main id="deck">
 *     <section class="slide">...</section>
 *     <section class="slide">...</section>
 *   </main>
 *
 * Boshqaruv:
 *   ->  <-  Space  PageUp/PageDown  Home/End  |  F = to'liq ekran  |  swipe
 *   Har bir slayd '#N' hash orqali havola qilinadi.
 */
(function () {
  'use strict';

  var deck = document.getElementById('deck');
  if (!deck) return;

  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  if (!slides.length) return;

  var total = slides.length;
  var index = 0;

  var progress = document.getElementById('progress');
  var counter = document.getElementById('counter');
  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');
  var fsBtn = document.getElementById('btn-fullscreen');

  function clamp(n) { return Math.max(0, Math.min(total - 1, n)); }

  function readHash() {
    var n = parseInt((location.hash || '').replace(/^#/, ''), 10);
    return isFinite(n) ? clamp(n - 1) : 0;
  }

  function render() {
    for (var i = 0; i < total; i++) {
      var active = i === index;
      slides[i].classList.toggle('is-active', active);
      slides[i].setAttribute('aria-hidden', active ? 'false' : 'true');
    }
    if (progress) progress.style.width = ((index + 1) / total * 100) + '%';
    if (counter) counter.textContent = (index + 1) + ' / ' + total;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;
  }

  function updateHash() {
    try { history.replaceState(null, '', '#' + (index + 1)); }
    catch (e) { location.hash = '#' + (index + 1); }
  }

  function go(n, silent) {
    var next = clamp(n);
    if (next !== index) {
      index = next;
      if (silent !== false) updateHash();
    }
    render();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  // --- tugmalar ---
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // --- klaviatura ---
  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        next(); e.preventDefault(); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        prev(); e.preventDefault(); break;
      case 'Home':
        go(0); e.preventDefault(); break;
      case 'End':
        go(total - 1); e.preventDefault(); break;
      case 'f':
      case 'F':
        toggleFullscreen(); break;
    }
  });

  // --- swipe (mobil) ---
  var startX = 0, startY = 0, tracking = false;
  deck.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  deck.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  // --- to'liq ekran ---
  function toggleFullscreen() {
    var el = document.documentElement;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

  // --- hash (havola / orqaga-qaytish) ---
  window.addEventListener('hashchange', function () { go(readHash(), false); });

  index = readHash();
  render();
  updateHash();
})();
