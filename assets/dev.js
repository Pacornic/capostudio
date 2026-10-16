/* Motor de la pestaña "En desarrollo": catálogo de prototipos jugables.
   Modelo abierto (estilo hub): cada tarjeta ENLAZA al juego en su propia URL
   (se abre a pantalla completa) y permite copiar el enlace para compartirlo.
   Sin candado: el acceso es abierto. */
(function () {
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function absURL(path){ return new URL(path, window.location.href).href; }

  window.initDev = function (opts) {
    var mount = document.querySelector(opts.mount);
    var protos = window.PROTOS || [];

    if (!protos.length) {
      mount.innerHTML = '<div class="py-empty">Aún no hay prototipos publicados. Añade el primero copiando su HTML en la carpeta <code>/dev/</code> y registrándolo en <code>assets/data.js</code>.</div>';
      return;
    }

    mount.innerHTML = protos.map(function (p, idx) {
      var bits = [];
      if (p.players) bits.push(esc(p.players));
      if (p.time) bits.push(esc(p.time));
      if (p.updated) bits.push('Actualizado: ' + esc(p.updated));
      var meta = bits.length ? '<div class="meta">' + bits.join(' · ') + '</div>' : '';
      var tags = (p.tags && p.tags.length)
        ? '<div class="py-tags">' + p.tags.map(function (t) { return '<span class="py-tag">' + esc(t) + '</span>'; }).join('') + '</div>'
        : '';
      return '<div class="py-proto" data-idx="' + idx + '">' +
        '<h3>' + esc(p.name) + '</h3>' +
        meta +
        (p.desc ? '<p class="pdesc">' + esc(p.desc) + '</p>' : '') +
        tags +
        '<div class="py-actions">' +
          '<a class="py-btn primary" href="' + esc(p.path) + '" target="_blank" rel="noopener">&#9654; Jugar</a>' +
          '<button class="py-btn" data-act="copy">Copiar enlace</button>' +
        '</div>' +
        '</div>';
    }).join('');

    mount.querySelectorAll('.py-proto').forEach(function (el) {
      var p = protos[+el.getAttribute('data-idx')];
      el.querySelector('[data-act="copy"]').addEventListener('click', function (e) {
        var url = absURL(p.path);
        var b = e.target, old = b.textContent;
        function done(){ b.textContent = 'Enlace copiado ✓'; setTimeout(function(){ b.textContent = old; }, 1600); }
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function(){ window.prompt('Copia el enlace:', url); });
        else window.prompt('Copia el enlace:', url);
      });
    });
  };
})();
