(function () {
  'use strict';

  var grid = document.getElementById('deck-grid');
  var status = document.getElementById('deck-status');
  if (!grid) return;

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    try {
      return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return d.toLocaleDateString();
    }
  }

  function card(item, i) {
    var tags = (item.tags || []).slice(0, 4).map(function (t) {
      return '<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">' + esc(t) + '</span>';
    }).join('');

    var meta = [];
    if (item.course) meta.push(esc(item.course));
    if (item.author) meta.push(esc(item.author));
    if (item.date) meta.push(esc(formatDate(item.date)));

    return [
      '<a href="' + esc(item.file) + '" class="reveal card group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]">',
      '  <div class="flex items-start justify-between">',
      '    <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">' + (i + 1) + '</span>',
      '    <span class="translate-x-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden="true">&rarr;</span>',
      '  </div>',
      '  <h3 class="mt-5 text-lg font-semibold leading-snug tracking-tight text-slate-900">' + esc(item.title || 'Nomsiz taqdimot') + '</h3>',
      item.description
        ? '  <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">' + esc(item.description) + '</p>'
        : '',
      '  <div class="mt-auto pt-5">',
      tags ? '    <div class="mb-3 flex flex-wrap gap-1.5">' + tags + '</div>' : '',
      meta.length ? '    <p class="text-xs text-slate-400">' + meta.join(' &middot; ') + '</p>' : '',
      '  </div>',
      '</a>'
    ].filter(Boolean).join('\n');
  }

  var list = window.PRESENTATIONS;

  if (!Array.isArray(list) || !list.length) {
    if (status) status.textContent = 'Hozircha taqdimotlar yo\u2018q.';
    return;
  }

  grid.innerHTML = list.map(card).join('');
  if (status) status.textContent = list.length + ' ta taqdimot';
})();
