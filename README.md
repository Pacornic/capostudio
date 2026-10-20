# Web de juegos — Paco Yanez (capostudio)

Sitio estático (HTML + CSS + JS, sin framework) alojado en Vercel. Tres secciones:
**Publicados**, **Próximamente** y **Prototypes**. Funciona offline e instalable como app (PWA).

---

## 1. "Quiero cambiar X, ¿a qué archivo voy?"

| Lo que quieres cambiar | Archivo | Dónde dentro del archivo |
|---|---|---|
| El **contenido** de un juego publicado o próximamente (nombre, año, jugadores, duración, edad, descripción, portada, fotos) | `assets/data.js` | array **`GAMES`** (busca el juego por su `n`) |
| Las **mecánicas** de un publicado/próximamente | `assets/data.js` | objeto **`MECH`** (por `id` del juego) |
| Las **editoriales** de un publicado/próximamente | `assets/data.js` | objeto **`PUB`** (por `id` del juego) |
| El **contenido** de un prototipo (nombre, tipo, jugadores, duración, mecánicas, descripción, enlaces) | `assets/data.js` | array **`PROTOS`** |
| Que un juego pase de Próximamente a Publicados | `assets/data.js` | cambia su `cat` de `"soon"` a `"pub"` (y pon el año en `y`) |
| Los **rótulos** fijos (Players, Duration, Age, Year, Mechanics, Editorial) de **Publicados/Próximamente** | `assets/catalog.js` | dentro de `showDetail` |
| Los **rótulos** fijos de **Prototypes** | `assets/dev.js` | dentro de `showDetail` |
| **Colores, tamaños, botones** (incl. botón Volver, píldoras de mecánicas) | `assets/styles.css` | — |
| Los **textos de las pestañas / títulos** de cada página | el `.html` de esa página | `<h1>` y la barra `<nav>` |
| El **HTML jugable** de un prototipo | `dev/<nombre>/...` | el archivo del juego |

Regla de oro: **los valores** (lo que dice cada juego) están en `data.js`; **los rótulos y la estructura** están en el código (`catalog.js` o `dev.js`); **la apariencia** en `styles.css`.

---

## 2. Qué archivo JS usa cada página (HTML)

| Página (HTML) | Sección | Carga estos JS | Función que arranca |
|---|---|---|---|
| `index.html` | Publicados | `assets/data.js` + `assets/catalog.js` | `initCatalog({category:"pub"})` |
| `proximamente.html` | Próximamente | `assets/data.js` + `assets/catalog.js` | `initCatalog({category:"soon"})` |
| `protos.html` | Prototypes | `assets/data.js` + `assets/dev.js` | `initDev()` |

- `data.js` lo cargan **las tres** páginas (es el almacén común de datos).
- `catalog.js` es el motor de las fichas de **Publicados y Próximamente** (vienen de BGG).
- `dev.js` es el motor de **Prototypes** (tus juegos jugables, con botones Jugar y Rules).
- Las tres páginas comparten `assets/styles.css`.

---

## 3. Estructura de carpetas

```
(raíz del repo)
├── index.html             Publicados (página de inicio)
├── proximamente.html      Próximamente
├── protos.html            Prototypes
├── manifest.webmanifest   Datos de la app instalable (PWA): nombre, iconos
├── sw.js                  Service Worker: modo offline + actualización automática
├── README.md              Este archivo
│
├── assets/                EL CEREBRO DEL SITIO
│   ├── data.js            TODOS los datos: GAMES, MECH, PUB, PROTOS (+ helpers de imagen)
│   ├── catalog.js         Motor de Publicados y Próximamente
│   ├── dev.js             Motor de Prototypes
│   └── styles.css         Estilos de todo el sitio
│
├── icons/                 Iconos de la app (PWA)
│   ├── icon-192.png
│   └── icon-512.png
│
├── dev/                   LOS PROTOTIPOS JUGABLES (una subcarpeta por juego)
│   ├── The Wild Call/the-wild-call.html
│   └── Niwa/Niwa.html
│
├── scripts/               Intento de actualización automática desde BGG (NO operativo, ver §8)
│   ├── update-bgg.mjs
│   └── extra-ids.json
└── .github/workflows/     El "botón" del workflow (NO operativo, ver §8)
    └── main.yml
```

---

## 4. Campos de cada juego

### Publicados / Próximamente → array `GAMES` en `data.js`
```js
{
  i:   "131241",      // id de BGG (clave para MECH y PUB)
  n:   "Oilfield",    // nombre
  y:   "2016",        // año; en próximamente puede ser "Próximamente"
  cat: "pub",         // "pub" = Publicados | "soon" = Próximamente
  pl:  "2-5",         // jugadores (el rótulo "Players" lo pone el código)
  t:   "60 min",      // duración
  ag:  "12+",         // edad
  d:   "Descripción…",
  c:   "token~o~url", // portada (token BGG comprimido O una URL http completa)
  p:   ["…","…"]      // fotos (tokens BGG o URLs); [] si no hay
}
```
- Mecánicas → en `MECH` así: `"131241": ["Worker Placement", "Auction / Bidding"]`
- Editoriales → en `PUB` así: `"131241": ["ABBA Games"]`

### Prototipos → array `PROTOS` en `data.js`
```js
{
  name:     "Niwa",
  type:     "Board Game",          // subtítulo (ej. Card Game / Board Game)
  emoji:    "🐞",                   // miniatura (si no pones imagen)
  color:    "#2f4a3a",             // color de fondo de la miniatura
  thumb:    "dev/niwa/cover.jpg",  // opcional: imagen de portada (sustituye al emoji)
  desc:     "Descripción…",
  players:  "2-4",                 // se muestra tal cual (el rótulo "Players" lo pone el código)
  time:     "20 min",
  tags:     ["Tile Placement","Set Collection"],  // = mecánicas; SIEMPRE entre comillas
  path:     "dev/Niwa/Niwa.html",  // página jugable → botón "Jugar"
  rulebook: "https://drive.google.com/…"           // enlace al reglamento → botón "Rules"
}
```
- Si `path` está vacío, no aparece el botón **Jugar**. Si `rulebook` está vacío, no aparece **Rules**.
- **`tags` SIEMPRE entre comillas y separadas por comas:** `["A","B"]`. Si pones `[A, B]` sin comillas, se rompe toda la web.

---

## 5. Cómo añadir un juego publicado / próximamente

1. Añade su bloque al array `GAMES` en `data.js` (copia uno existente y cambia los valores).
2. Si quieres mecánicas y editorial, añade su `id` en `MECH` y `PUB`.
3. `cat: "pub"` lo pone en Publicados; `cat: "soon"` en Próximamente.
4. Sube `data.js` a GitHub.

## 6. Cómo añadir un prototipo

1. Copia el HTML jugable dentro de `dev/`, en su propia carpeta: `dev/mi-juego/index.html`.
2. Añade su bloque al array `PROTOS` en `data.js` con `path: "dev/mi-juego/index.html"`.
3. Para el reglamento, pon en `rulebook` el enlace de Google Drive (ver §7).
4. Sube `data.js` (y la carpeta del juego) a GitHub.

## 7. Reglamentos con Google Drive (actualización fácil)

El campo `rulebook` acepta cualquier enlace. Para poder actualizar el PDF **sin cambiar el enlace**:
sube el PDF a Drive, compártelo como *"Cualquiera con el enlace – Lector"*, pégalo en `rulebook`,
y cuando quieras cambiarlo usa en Drive **clic derecho → Gestionar versiones → Subir nueva versión**.
El ID no cambia, así que el botón **Rules** siempre muestra la última versión.

---

## 8. Actualización automática desde BGG — estado

Se intentó un "botón" (GitHub Actions + `scripts/update-bgg.mjs`) para traer juegos de BGG solos,
pero **BGG bloquea las peticiones desde servidores** (error 401). Por eso `scripts/` y
`.github/workflows/main.yml` **no funcionan** y pueden borrarse. La forma fiable de actualizar datos
de BGG es pedírselo al asistente (se hace por navegador) o editar `data.js` a mano.

## 9. Offline y app instalable (PWA)

- `sw.js` guarda el sitio para que funcione sin conexión (tras la primera visita con conexión).
- **La actualización es automática:** con conexión siempre carga lo más reciente; no hay que tocar
  ninguna versión. Tú subes cambios a GitHub y listo.
- `manifest.webmanifest` + `icons/` permiten "Añadir a pantalla de inicio" y abrirlo como app.

## 10. Publicar cambios

Edita el archivo que toque (según §1), súbelo a GitHub, y Vercel vuelve a desplegar solo.
