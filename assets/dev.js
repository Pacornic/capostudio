/* Motor de la pestaña "En desarrollo": lista de prototipos jugables.
   Cada prototipo se abre con un botón "Abrir". Si proto.code tiene valor,
   pide ese código y, si es correcto, incrusta el prototipo en un iframe aquí
   mismo (no se abre en pestaña nueva ni se ofrece copiar enlace, para no
   repartir la URL directa que saltaría el código).
   AVISO: es una capa DISUASORIA, no seguridad real. El archivo se sirve
   público; quien conozca/inspeccione su URL puede abrirlo igualmente.
   Para protección real: Password Protection de Vercel o un Edge Middleware. */
(function () {
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  window.initDev = function (opts) {
    var mount = document.querySelector(opts.mount);
    var protos = window.PROTOS || [];

    if (!protos.length) {
      mount.innerHTML = '<div class="py-empty">Aún no hay prototipos publicados. Añade el primero copiando su HTML en la carpeta <code>/dev/</code> y registrándolo en <code>assets/data.js</code>.</div>';
      return;
    }

    mount.innerHTML = protos.map(function (p, idx) {
      var meta = p.updated ? 'Actualizado: ' + esc(p.updated) : '';
      var locked = p.code && p.code.length;
      return '<div class="py-proto" data-idx="' + idx + '">' +
        '<h3>' + esc(p.name) + (locked ? ' &#128274;' : '') + '</h3>' +
        (meta ? '<div class="meta">' + meta + '</div>' : '') +
        '<p class="pdesc">' + esc(p.desc || '') + '</p>' +
        '<div class="py-actions">' +
          '<button class="py-btn primary" data-act="open">Abrir' + (locked ? ' con código' : '') + '</button>' +
        '</div>' +
        '<div class="slot"></div>' +
        '</div>';
    }).join('');

    mount.querySelectorAll('.py-proto').forEach(function (el) {
      var p = protos[+el.getAttribute('data-idx')];
      var slot = el.querySelector('.slot');

      function embed() {
        slot.innerHTML = '<div class="py-frame-wrap"><iframe src="' + esc(p.path) + '" title="' + esc(p.name) + '"></iframe></div>';
      }

      el.querySelector('[data-act="open"]').addEventListener('click', function () {
        if (!(p.code && p.code.length)) { embed(); return; }
        slot.innerHTML = '<div class="py-codebox">' +
          '<input type="password" placeholder="Código de acceso" />' +
          '<button class="py-btn primary">Entrar</button>' +
          '<span class="err" style="display:none">Código incorrecto</span></div>';
        var inp = slot.querySelector('input');
        var err = slot.querySelector('.err');
        slot.querySelector('button').addEventListener('click', function () {
          if (inp.value === p.code) { embed(); }
          else { err.style.display = 'inline'; }
        });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { if (inp.value === p.code) embed(); else err.style.display = 'inline'; } });
        inp.focus();
      });
    });
  };
})();
