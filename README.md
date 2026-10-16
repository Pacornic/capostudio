# Web de juegos — Paco Yanez

Sitio estático multi-página para Vercel. Tres secciones con pestañas arriba:

- **index.html** — Publicados (página de inicio)
- **proximamente.html** — Próximamente
- **desarrollo.html** — En desarrollo (prototipos jugables para compartir)

## Estructura de archivos

```
juegos-web/
├── index.html            Publicados (landing)
├── proximamente.html     Próximamente
├── desarrollo.html       En desarrollo
├── assets/
│   ├── styles.css        Estilos de todo el sitio
│   ├── data.js           DATOS: juegos (GAMES) y prototipos (PROTOS)  ← se edita aquí
│   ├── catalog.js        Motor de Publicados/Próximamente
│   └── dev.js            Motor de En desarrollo
└── dev/
    └── ejemplo/index.html   Prototipo de ejemplo (sustituir)
```

Todo es estático: Vercel lo sirve tal cual. `index.html` es la página principal.

---

## Añadir un prototipo jugable (pestaña "En desarrollo")

1. Copia el HTML de tu prototipo dentro de `dev/`, cada uno en su carpeta, por ejemplo:
   `dev/mi-juego/index.html` (con sus imágenes/CSS/JS dentro de esa carpeta).
2. Abre `assets/data.js` y añade una entrada al array `PROTOS`:

```js
{
  name: "Nombre del prototipo",
  path: "dev/mi-juego/index.html",
  desc: "Breve descripción para los testers.",
  updated: "2026-10-16",
  code: ""           // vacío = sin código; p.ej. "clave123" = pide código al abrir
}
```

3. Sube los cambios (a GitHub si lo tienes conectado, o re-despliega). Aparecerá una tarjeta con:
   **Previsualizar aquí** (iframe), **Abrir a pantalla completa** y **Copiar enlace** (para compartir).

El enlace directo de un prototipo es, por ejemplo:
`https://TU-SITIO.vercel.app/dev/mi-juego/index.html`

---

## Sobre el "código de acceso" de los prototipos

El campo `code` del prototipo pide una clave antes de abrirlo, **pero es solo disuasorio, no seguridad real**: al ser un sitio estático, el navegador descarga el prototipo y su clave antes de comprobarla, así que alguien técnico puede saltárselo.

Opciones ordenadas por nivel de protección:

- **Disuasión (gratis, incluida):** el campo `code`. Frena al visitante casual.
- **Enlace no adivinable (gratis, efectivo):** nombra la carpeta con un token largo, p.ej.
  `dev/mi-juego-a9f3k2x8q1/index.html`. Con ~16 caracteres es inadivinable por fuerza bruta.
  Comparte solo el enlace con tus testers. Es el mejor coste/beneficio.
- **Seguridad real (requiere servidor/plan):** protección por contraseña de Vercel, o un
  Edge Middleware que valide la contraseña antes de servir la página.

---

## Publicar / actualizar

- Primera vez: sube la carpeta `juegos-web` a GitHub y conéctala a Vercel (Add New → Project → Import).
- Cada cambio: edítalo en GitHub (o localmente y haz push) → Vercel publica solo, en la misma URL.

## Datos

Los juegos de Publicados/Próximamente están en `assets/data.js` (array `GAMES`), con datos e imágenes de BoardGameGeek. Para añadir o editar un juego, se edita ahí.
