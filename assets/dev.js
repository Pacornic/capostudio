/* Motor de la pestaña "En desarrollo": catálogo de prototipos jugables (estilo hub).
   Cada prototipo = una entrada en PROTOS (ver assets/data.js). Tarjeta con
   miniatura, tipo, título, subtítulo, descripción, chips (jugadores / tiempo /
   mecánicas) y botones "Jugar" (abre el juego en su URL) y "Reglamento" (si existe).
   Todos los campos salvo name y path son opcionales: si faltan, no se pintan. */
(function () {
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  window.initDev = function (opts) {
    var mount = document.querySelector(opts.mount);
    var protos = window.PROTOS || [];

    if (!protos.length) {
      mount.innerHTML = '<div class="py-empty">Aún no hay prototipos publicados. Añade el primero copiando su HTML en la carpeta <code>/dev/</code> y registrándolo en <code>assets/data.js</code>.</div>';
      return;
    }

    mount.innerHTML = protos.map(function (p) {
      // Miniatura: imagen (thumb) o emoji sobre color de fondo
      var art;
      if (p.thumb) {
        art = '<div class="py-art" style="background-image:url(\'' + esc(p.thumb) + '\')"></div>';
      } else {
        var bg = p.color ? esc(p.color) : '#1f2e3f';
        art = '<div class="py-art" style="background:' + bg + '"><span class="py-art-emoji">' + esc(p.emoji || '🎲') + '</span></div>';
      }

      var chips = [];
      if (p.players) chips.push('<span class="py-chip">👥 ' + esc(p.players) + '</span>');
      if (p.time) chips.push('<span class="py-chip">⏱ ' + esc(p.time) + '</span>');
      (p.tags || []).forEach(function (t) { chips.push('<span class="py-chip tag">' + esc(t) + '</span>'); });
      var chipsHTML = chips.length ? '<div class="py-tags">' + chips.join('') + '</div>' : '';

      var btns = '';
      if (p.path) btns += '<a class="py-btn primary" href="' + esc(p.path) + '" target="_blank" rel="noopener">&#9654; Jugar</a>';
      if (p.rulebook) btns += '<a class="py-btn" href="' + esc(p.rulebook) + '" target="_blank" rel="noopener">📖 Reglamento</a>';

      return '<article class="py-proto">' +
        art +
        '<div class="py-body">' +
          (p.type ? '<div class="py-ptype">' + esc(p.type) + '</div>' : '') +
          '<h3>' + esc(p.name) + (p.subtitle ? ' <span class="py-sub">— ' + esc(p.subtitle) + '</span>' : '') + '</h3>' +
          (p.desc ? '<p class="pdesc">' + esc(p.desc) + '</p>' : '') +
          chipsHTML +
          (btns ? '<div class="py-actions">' + btns + '</div>' : '') +
          (p.updated ? '<div class="py-upd">Actualizado: ' + esc(p.updated) + '</div>' : '') +
        '</div>' +
      '</article>';
    }).join('');
  };
})();
