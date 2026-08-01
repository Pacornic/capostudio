# Juegos de Paco Yanez — web

Sitio estático (un solo archivo `index.html`) con el catálogo de juegos de mesa.
No necesita configuración: Vercel sirve `index.html` como página principal.

---

## Cómo publicarlo con GitHub + Vercel (paso a paso)

### Parte A — Subir a GitHub (una sola vez)

1. Entra en https://github.com y crea una cuenta si no tienes (gratis).
2. Arriba a la derecha pulsa **+ → New repository**.
3. Ponle un nombre, por ejemplo `juegos-paco`. Déjalo **Public** (o Private si prefieres). Pulsa **Create repository**.
4. En la página del repositorio vacío, haz clic en el enlace **"uploading an existing file"**.
5. Arrastra los dos archivos de esta carpeta: **`index.html`** y **`README.md`**.
6. Abajo pulsa **Commit changes**. Ya tienes tu código en GitHub.

### Parte B — Conectar con Vercel (una sola vez)

1. Entra en https://vercel.com e inicia sesión (puedes usar tu cuenta de GitHub).
2. Pulsa **Add New… → Project**.
3. En **Import Git Repository**, autoriza GitHub si te lo pide y elige el repositorio `juegos-paco`.
4. No hace falta tocar nada de configuración. Pulsa **Deploy**.
5. En unos segundos tendrás tu URL pública, tipo `juegos-paco.vercel.app`.

### Parte C — Publicar una versión nueva (cada vez que cambies algo)

1. Entra en tu repositorio en github.com.
2. Abre **`index.html`** y pulsa el icono del **lápiz** (editar).
3. Haz el cambio y pulsa **Commit changes**.
4. Vercel detecta el cambio y **publica solo, en la misma URL**. No tienes que tocar Vercel.

> Ventaja: misma dirección siempre, se actualiza sola y queda historial de cada versión (puedes deshacer).

---

## Notas

- Las portadas y fotos se cargan desde el servidor de imágenes de BoardGameGeek.
- Los juegos están definidos en el array `G` dentro de `index.html`. Para añadir o editar uno, se edita ahí.
- Este mismo contenido también existe como fragmento (`seccion-juegos.html`) para pegar en el elemento HTML de IONOS MyWebsite, por si quieres tenerlo en ambos sitios.
