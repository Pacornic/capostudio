/* Motor de la pestaña "En desarrollo": lista de prototipos jugables.
   Cada prototipo: previsualizar (iframe), abrir a pantalla completa y copiar enlace.
   Si proto.code tiene valor, pide ese código antes de abrir (capa disuasoria, NO seguridad real). */
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
      var meta = p.updated ? 'Actualizado: ' + esc(p.updated) : '';
      var locked = p.code && p.code.length;
      return '<div class="py-proto" data-idx="' + idx + '">' +
        '<h3>' + esc(p.name) + (locked ? ' &#128274;' : '') + '</h3>' +
        (meta ? '<div class="meta">' + meta + '</div>' : '') +
        '<p class="pdesc">' + esc(p.desc || '') + '</p>' +
        '<div class="py-actions">' +
          '<button class="py-btn primary" data-act="preview">Previsualizar aquí</button>' +
          '<button class="py-btn" data-act="open">Abrir a pantalla completa</button>' +
          '<button class="py-btn" data-act="copy">Copiar enlace</button>' +
        '</div>' +
        '<div class="slot"></div>' +
        '</div>';
    }).join('');

    mount.querySelectorAll('.py-proto').forEach(function (el) {
      var p = protos[+el.getAttribute('data-idx')];
      var slot = el.querySelector('.slot');

      function requireCode(onok) {
        if (!(p.code && p.code.length)) { onok(); return; }
        slot.innerHTML = '<div class="py-codebox">' +
          '<input type="password" placeholder="Código de acceso" />' +
          '<button class="py-btn primary">Entrar</button>' +
          '<span class="err" style="display:none">Código incorrecto</span></div>' +
          '<div class="py-note">Nota: esta protección es solo disuasoria. Para seguridad real usa un enlace no adivinable o la protección por contraseña de Vercel.</div>';
        var inp = slot.querySelector('input');
        var err = slot.querySelector('.err');
        slot.querySelector('button').addEventListener('click', function () {
          if (inp.value === p.code) { slot.innerHTML = ''; onok(); }
          else { err.style.display = 'inline'; }
        });
        inp.focus();
      }

      el.querySelector('[data-act="preview"]').addEventListener('click', function () {
        requireCode(function () {
          slot.innerHTML = '<div class="py-frame-wrap"><iframe src="' + esc(p.path) + '" title="' + esc(p.name) + '"></iframe></div>';
        });
      });
      el.querySelector('[data-act="open"]').addEventListener('click', function () {
        requireCode(function () { window.open(p.path, '_blank', 'noopener'); });
      });
      el.querySelector('[data-act="copy"]').addEventListener('click', function (e) {
        var url = absURL(p.path);
        navigator.clipboard && navigator.clipboard.writeText(url).then(function () {
          var b = e.target; var old = b.textContent; b.textContent = 'Enlace copiado ✓';
          setTimeout(function () { b.textContent = old; }, 1600);
        }, function () { window.prompt('Copia el enlace:', url); });
      });
    });
  };
})();
