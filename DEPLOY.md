# Guía de Deploy

## Arquitectura

Un solo proyecto en Vercel sirve tanto el frontend como el backend:

```
https://tu-app.vercel.app/          → frontend React (Vite)
https://tu-app.vercel.app/api/*     → backend Express (serverless)
https://tu-app.vercel.app/api/health → endpoint de salud
                  ↓
            Supabase (PostgreSQL)
```

## Paso 1 — Base de datos en Supabase

1. Ve a https://supabase.com y crea cuenta gratuita (puedes entrar con GitHub)
2. Clic en "New project"
3. Nombre de proyecto: album-mundial
4. Escribe una contraseña segura — GUÁRDALA
   IMPORTANTE: si usas caracteres especiales (@, #, !) en la contraseña,
   codifícalos en URL: @→%40, #→%23, !→%21
5. Región: East US (Ohio) o la más cercana
6. Clic en "Create new project" — espera ~2 minutos
7. Ve a: Settings (engranaje) → Database
8. Sección "Connection string" → pestaña "URI"
9. Copia la cadena. Formato:
   postgresql://postgres:[TU-PASSWORD]@db.XXXX.supabase.co:5432/postgres
10. Reemplaza [TU-PASSWORD] con tu contraseña del Paso 4
11. Guarda esa cadena — la usarás en el Paso 2

AVISO: Supabase pausa proyectos sin actividad por más de 1 semana.
Si el backend no responde, ve a tu dashboard → tu proyecto → "Restore project" (~1 min).

## Paso 2 — Deploy en Vercel (frontend + backend juntos)

1. Ve a https://vercel.com y crea cuenta con GitHub
2. New Project → importa tu repositorio de GitHub
3. Configuración importante:
   - Root Directory: . (dejar en blanco / raíz del repositorio)
   - Framework Preset: Other
   - Build Command: (Vercel lo leerá del vercel.json — no cambiar)
   - Output Directory: (igual, lo lee del vercel.json)
4. En "Environment Variables" agrega UNA sola variable:
   - DATABASE_URL = postgresql://postgres:[TU-PASSWORD]@db.XXXX.supabase.co:5432/postgres
     (la cadena del Paso 1)
5. Clic en "Deploy" — espera 2-3 minutos
6. Copia tu URL: https://album-mundial-XXXX.vercel.app

## Paso 3 — Verificación final

Abre tu URL de Vercel y confirma:
- [ ] La página carga sin errores en la consola (F12)
- [ ] Visita https://TU-URL.vercel.app/api/health — debe responder {"estado":"ok",...}
- [ ] Cambia a "Modo API" y crea un ítem — aparece en la lista
- [ ] Recarga la página — el ítem persiste (guardado en Supabase)
- [ ] Cambia a "Modo Local" — también funciona
- [ ] Las gráficas muestran datos
- [ ] El tema claro/oscuro funciona

## Variables de entorno necesarias en Vercel

| Variable       | Valor                              | Quién la usa |
|----------------|------------------------------------|--------------|
| DATABASE_URL   | cadena de conexión de Supabase     | backend      |

No se necesita FRONTEND_URL (mismo dominio, sin CORS).
No se necesita VITE_API_URL (URL relativa /api/...).

## Desarrollo local

1. Copia backend/.env.example a backend/.env y pon tu DATABASE_URL real
2. En una terminal: cd backend && npm run dev
3. En otra terminal: cd frontend && npm run dev
4. El proxy de Vite enruta /api/* → localhost:3000 automáticamente
