# NOCTRA

App web privada de musica con Next.js App Router, TypeScript, Tailwind CSS, Supabase, Zustand y reproductor global con audio real desde Cloudinary.

## Instalacion

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_APP_NAME=NOCTRA
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

`SUPABASE_SERVICE_ROLE_KEY` solo se usa en route handlers del servidor. No se expone al navegador.

## Crear Supabase

1. Crea un proyecto en Supabase.
2. En Project Settings > API copia `Project URL`, `anon public` y `service_role`.
3. Pega esos valores en `.env.local`.
4. En SQL Editor ejecuta `supabase/schema.sql`.

## Insertar datos demo

En SQL Editor ejecuta `supabase/seed.sql`.

El seed incluye cinco canciones reales de Cloudinary:

- Careless Whisper
- Redemption
- Self Aware
- Beauty And A Beat
- Confident

Careless Whisper queda como favorita y destacada inicial. `lyrics_lrc` inicia con un placeholder privado, sin letras reales.

## Admin

Entra a `/admin`. Si no hay sesion, la app redirige a `/admin/login`.

Desde Admin puedes:

- Crear, editar y eliminar canciones.
- Cambiar titulo, artista, album, genero, mood, audio_url, cover_url, lyrics_lrc, duracion y favorito.
- Probar `audio_url` antes de guardar.
- Crear, editar y eliminar playlists.
- Agregar y quitar canciones de playlists.

Al guardar una nueva URL de Cloudinary, la app refresca los datos y la usa inmediatamente desde Supabase.

## Desplegar en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repo en Vercel.
3. Agrega las mismas variables de entorno.
4. Ejecuta el schema y seed en Supabase antes de abrir la app.
5. Deploy.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
# noctra
