/* Service Worker: modo offline completo (precachea páginas, datos, portadas,
   fotos y prototipos) + instalable como PWA.
   IMPORTANTE: sube el número de versión (CACHE) cada vez que cambies archivos,
   para que a los visitantes les llegue la versión nueva. */
const CACHE = 'capostudio-v1';

/* Cargar los datos para conocer todas las imágenes/prototipos a precachear.
   data.js usa "window"; en el SW no existe, así que lo apuntamos a "self". */
self.window = self;
try { importScripts('./assets/data.js'); } catch (e) { /* seguirá funcionando con lo básico */ }

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
function protoUrls() {
  return (self.PROTOS || []).map(p => p.path).filter(Boolean);
}

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(LOCAL).catch(() => {});
    // Prototipos (mismo origen; pueden llevar espacios en la ruta)
    await Promise.all(protoUrls().map(async (u) => {
      try { const req = new Request(encodeURI(u)); const r = await fetch(req); if (r.ok) await cache.put(req, r); } catch (e) {}
    }));
    // Imágenes de BGG (otro origen -> no-cors, se guardan como "opacas")
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
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      try { const cache = await caches.open(CACHE); cache.put(req, res.clone()); } catch (e) {}
      return res;
    } catch (e) {
      if (req.mode === 'navigate') {
        const idx = await caches.match('./index.html');
        if (idx) return idx;
      }
      return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
    }
  })());
});
