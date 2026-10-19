/* Service Worker: offline completo + instalable (PWA) con actualización AUTOMÁTICA.
   No hay que tocar ninguna versión a mano:
   - Con conexión: siempre busca la versión más reciente del sitio y refresca la copia.
   - Sin conexión: sirve la última copia guardada.
   - Imágenes de BGG (no cambian): se sirven desde la copia, rápidas. */
const CACHE = 'capostudio';

/* Cargar los datos para precachear imágenes/prototipos en la primera visita.
   data.js usa "window"; en el SW no existe, lo apuntamos a "self". */
self.window = self;
try { importScripts('./assets/data.js'); } catch (e) {}

const LOCAL = [
  './', './index.html', './proximamente.html', './protos.html',
  './assets/styles.css', './assets/data.js', './assets/catalog.js', './assets/dev.js',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'
];

function imageUrls() {
  const out = [];
  (self.GAMES || []).forEach(g => {
    const c = self.COVER && self.COVER(g.c); if (c) out.push(c);
    (g.p || []).forEach(p => { const u = self.PHOTO && self.PHOTO(p); if (u) out.push(u); });
  });
  (self.PROTOS || []).forEach(p => { if (p.thumb) out.push(p.thumb); });
  return out;
}
function protoUrls() { return (self.PROTOS || []).map(p => p.path).filter(Boolean); }

/* Primera visita: guardar todo para que funcione offline desde ya. */
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(LOCAL).catch(() => {});
    await Promise.all(protoUrls().map(async (u) => {
      try { const req = new Request(encodeURI(u)); const r = await fetch(req); if (r.ok) await cache.put(req, r); } catch (e) {}
    }));
    await Promise.all(imageUrls().map(async (u) => {
      try { const r = await fetch(u, { mode: 'no-cors' }); await cache.put(u, r); } catch (e) {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;

  if (sameOrigin) {
    // Páginas, datos, estilos y scripts -> RED PRIMERO (siempre lo más nuevo),
    // y si no hay conexión, la copia guardada. Así se actualiza solo.
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        try { const cache = await caches.open(CACHE); cache.put(req, res.clone()); } catch (e) {}
        return res;
      } catch (e) {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (req.mode === 'navigate') {
          const idx = await caches.match('./index.html');
          if (idx) return idx;
        }
        return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
      }
    })());
  } else {
    // Imágenes de BGG -> COPIA PRIMERO (rápidas), y si no están, de la red.
    e.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        try { const cache = await caches.open(CACHE); cache.put(req, res.clone()); } catch (e) {}
        return res;
      } catch (e) {
        return new Response('', { status: 503 });
      }
    })());
  }
});
