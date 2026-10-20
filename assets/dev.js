/* Motor de la pestaña "Prototypes": mismo formato que el catálogo (parrilla + ficha).
   Al hacer clic en un prototipo se abre su ficha con datos, mecánicas (sus tags) y
   los botones "Jugar" (abre el juego en su URL) y "Reglamento" (si existe). */
(function () {
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  window.initDev = function (opts) {
    var mount = document.querySelector(opts.mount);
    var protos = window.PROTOS || [];

    mount.innerHTML =
      '<div class="py-view" id="list"><div class="py-grid" id="grid"></div></div>' +
      '<div class="py-view py-detail" id="detail"></div>';
    var listV = mount.querySelector('#list');
    var detV = mount.querySelector('#detail');
    var grid = mount.querySelector('#grid');

    if (!protos.length) {
      grid.outerHTML = '<div class="py-empty">Aún no hay prototipos. Añade uno en <code>/dev/</code> y regístralo en <code>assets/data.js</code>.</div>';
      return;
    }

    function thumb(p) {
      if (p.thumb) return '<div class="py-thumb" style="background-image:url(\'' + esc(p.thumb) + '\')"></div>';
      return '<div class="py-thumb py-thumb-emoji" style="background:' + (p.color ? esc(p.color) : '#1f2e3f') + '">' + esc(p.emoji || '🎲') + '</div>';
    }
    function cover(p) {
      if (p.thumb) return '<img class="py-dcover" src="' + esc(p.thumb) + '" alt="' + esc(p.name) + '">';
      return '<div class="py-dcover py-dcover-emoji" style="background:' + (p.color ? esc(p.color) : '#1f2e3f') + '">' + esc(p.emoji || '🎲') + '</div>';
    }

    function stripPlayers(v) { return String(v).replace(/\s*(jugadores?|players?)/i, ''); }

    grid.innerHTML = protos.map(function (p, idx) {
      var cs = [];
      if (p.players) cs.push('<div class="py-stat"><div class="k">Players</div><div class="v">' + esc(stripPlayers(p.players)) + '</div></div>');
      if (p.time) cs.push('<div class="py-stat"><div class="k">Duration</div><div class="v">' + esc(p.time) + '</div></div>');
      var cstats = cs.length ? '<div class="py-cstats">' + cs.join('') + '</div>' : '';
      return '<div class="py-card" data-idx="' + idx + '">' + thumb(p) +
        '<div class="py-cbody"><div class="py-cname">' + esc(p.name) + '</div>' +
        (p.type ? '<div class="py-cyear">' + esc(p.type) + '</div>' : '') + cstats + '</div></div>';
    }).join('');

    grid.querySelectorAll('.py-card').forEach(function (el) {
      el.addEventListener('click', function () { showDetail(+el.getAttribute('data-idx')); });
    });

    function showDetail(idx) {
      var p = protos[idx];
      var sarr = [];
      if (p.players) sarr.push('<div class="py-stat"><div class="k">Players</div><div class="v">' + esc(String(p.players).replace(/\s*(jugadores?|players?)/i, '')) + '</div></div>');
      if (p.time) sarr.push('<div class="py-stat"><div class="k">Duration</div><div class="v">' + esc(p.time) + '</div></div>');
      var stats = sarr.length ? '<div class="py-stats">' + sarr.join('') + '</div>' : '';

      var tags = p.tags || [];
      var mechHTML = tags.length
        ? '<div class="py-mechs-t">Mechanics</div><div class="py-mechrow">' +
          tags.map(function (m) { return '<span class="py-mech">' + esc(m) + '</span>'; }).join('') + '</div>'
        : '';

      var btns = '';
      if (p.path) btns += '<a class="py-btn primary" href="' + esc(p.path) + '" target="_blank" rel="noopener">&#9654; Jugar</a>';
      if (p.rulebook) btns += '<a class="py-btn" href="' + esc(p.rulebook) + '" target="_blank" rel="noopener">📖 Rules</a>';

      detV.innerHTML = '<button class="py-back">&larr; Volver</button>' +
        '<div class="py-dhead">' + cover(p) +
        '<div class="py-dinfo"><h2>' + esc(p.name) + '</h2>' +
        (p.type ? '<div class="py-dyear">' + esc(p.type) + '</div>' : '') + stats + mechHTML +
        '</div></div>' +
        '<div class="py-dbody">' +
        (p.desc ? '<p class="py-ddesc">' + esc(p.desc) + '</p>' : '') +
        (btns ? '<div class="py-actions">' + btns + '</div>' : '') +
        '</div>';

      detV.querySelector('.py-back').addEventListener('click', showList);
      listV.style.display = 'none';
      detV.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showList() { detV.style.display = 'none'; listV.style.display = 'block'; }
  };
})();
