/* Motor de las páginas de catálogo (Publicados / Próximamente).
   Uso: initCatalog({category:"pub", mount:"#app"}) */
(function () {
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  window.initCatalog = function (opts) {
    var cat = opts.category;
    var mount = document.querySelector(opts.mount);
    var games = window.GAMES.filter(function (g) { return g.cat === cat; });

    mount.innerHTML =
      '<div class="py-view" id="list"><div class="py-grid" id="grid"></div></div>' +
      '<div class="py-view py-detail" id="detail"></div>' +
      '<div id="py-lb"><span class="x">&times;</span><img alt=""></div>';

    var listV = mount.querySelector('#list');
    var detV = mount.querySelector('#detail');
    var grid = mount.querySelector('#grid');
    var lb = mount.querySelector('#py-lb');
    var lbImg = lb.querySelector('img');

    if (!games.length) {
      grid.outerHTML = '<div class="py-empty">Todavía no hay juegos en esta sección.</div>';
      return;
    }

    grid.innerHTML = games.map(function (g, idx) {
      var cov = window.COVER(g.c);
      var thumb = cov
        ? '<div class="py-thumb" style="background-image:url(\'' + cov + '\')"></div>'
        : '<div class="py-thumb"><div class="py-noimg">Imagen no disponible todavía</div></div>';
      var cpubs = (window.PUB && window.PUB[g.i]) || [];
      var cpubLine = cpubs.length ? '<div class="py-cpub">' + esc(cpubs.join(', ')) + '</div>' : '';
      return '<div class="py-card" data-idx="' + idx + '">' + thumb +
        '<div class="py-cbody"><div class="py-cname">' + esc(g.n) + '</div><div class="py-cyear">' + esc(g.y) + '</div>' + cpubLine + '</div></div>';
    }).join('');

    grid.querySelectorAll('.py-card').forEach(function (el) {
      el.addEventListener('click', function () { showDetail(+el.getAttribute('data-idx')); });
    });

    function showDetail(idx) {
      var g = games[idx], cov = window.COVER(g.c);
      var stats = '<div class="py-stats">' +
        '<div class="py-stat"><div class="k">Players</div><div class="v">' + esc(g.pl) + '</div></div>' +
        '<div class="py-stat"><div class="k">Duration</div><div class="v">' + esc(g.t) + '</div></div>' +
        '<div class="py-stat"><div class="k">Age</div><div class="v">' + esc(g.ag) + '</div></div>' +
        (g.cat === 'pub' ? '<div class="py-stat"><div class="k">Year</div><div class="v">' + esc(g.y) + '</div></div>' : '') +
        '</div>';
      var coverHTML = cov
        ? '<img class="py-dcover" src="' + cov + '" alt="' + esc(g.n) + '">'
        : '<div class="py-dcover" style="width:253px;height:322px;display:flex;align-items:center;justify-content:center;color:var(--mut);font-size:.85rem;text-align:center;padding:14px;">Imagen no disponible todavía</div>';
      var gall = g.p && g.p.length
        ? '<div class="py-gallt">Fotos</div><div class="py-gall">' +
          g.p.map(function (t) { var u = window.PHOTO(t); return '<img loading="lazy" src="' + u + '" data-full="' + u + '" alt="' + esc(g.n) + '">'; }).join('') + '</div>'
        : '<div class="py-gallt">Fotos</div><p class="py-nogall">Aún no hay fotos disponibles en BGG para este juego.</p>';

      var mechs = (window.MECH && window.MECH[g.i]) || [];
      var mechHTML = mechs.length
        ? '<div class="py-mechs-t">Mechanics</div><div class="py-mechrow">' +
          mechs.map(function (m) { return '<span class="py-mech">' + esc(m) + '</span>'; }).join('') + '</div>'
        : '';

      var pubs = (window.PUB && window.PUB[g.i]) || [];
      var pubHTML = pubs.length
        ? '<div class="py-pub"><span class="py-pub-k">Editorial</span><span class="py-pub-v">' + pubs.map(esc).join(', ') + '</span></div>'
        : '';

      detV.innerHTML = '<button class="py-back">&larr; Volver</button>' +
        '<div class="py-dhead">' + coverHTML +
        '<div class="py-dinfo"><h2>' + esc(g.n) + '</h2><div class="py-dyear">' + esc(g.y) + '</div>' + stats + mechHTML + pubHTML +
        '</div></div>' +
        '<div class="py-dbody">' +
        '<p class="py-ddesc">' + esc(g.d) + '</p>' +
        '<a class="py-bgg" href="https://boardgamegeek.com/boardgame/' + g.i + '" target="_blank" rel="noopener">Ver ficha completa en BoardGameGeek &rarr;</a>' +
        '</div>' + gall;

      detV.querySelector('.py-back').addEventListener('click', showList);
      detV.querySelectorAll('.py-gall img').forEach(function (im) {
        im.addEventListener('click', function () { lbImg.src = im.getAttribute('data-full'); lb.style.display = 'flex'; });
      });
      listV.style.display = 'none';
      detV.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showList() { detV.style.display = 'none'; listV.style.display = 'block'; }
    lb.addEventListener('click', function () { lb.style.display = 'none'; lbImg.src = ''; });
  };
})();
