# Guía de Deploy

## Paso 1 — Base de datos en Supabase

1. Ve a https://supabase.com y crea cuenta gratuita (puedes entrar con GitHub)
2. Clic en "New project"
3. Elige un nombre de proyecto: album-mundial
4. Escribe una contraseña segura para la base de datos — GUÁRDALA, la necesitarás
   IMPORTANTE: si usas caracteres especiales (@, #, !) en la contraseña,
   deberás codificarlos en URL al armar la cadena de conexión (@→%40, #→%23, !→%21)
5. Selecciona la región: East US (Ohio) o la más cercana disponible
6. Clic en "Create new project" y espera ~2 minutos a que inicialice
7. Una vez listo, ve a: Settings (ícono engranaje) → Database
8. Baja hasta la sección "Connection string" y selecciona la pestaña "URI"
9. Copia la cadena completa. Tiene este formato:
   postgresql://postgres:[TU-PASSWORD]@db.XXXX.supabase.co:5432/postgres
10. Reemplaza [TU-PASSWORD] con la contraseña que escribiste en el Paso 4
11. Guarda esa cadena — la usarás en el Paso 2 y en tu archivo .env local

AVISO DE PLAN GRATUITO: Supabase pausa proyectos con más de 1 semana
sin actividad. Si el evaluador visita la app y el backend no responde,
entra a tu dashboard de Supabase → tu proyecto → clic en "Restore project".
Tarda ~1 minuto en reactivarse.

## Paso 2 — Backend en Vercel

1. Ve a https://vercel.com (misma cuenta que usarás para el frontend)
2. New Project → importa tu repositorio de GitHub
3. Configuración:
   - Root Directory: backend
   - Framework Preset: Other
   - Build Command: (dejar vacío)
   - Output Directory: (dejar vacío)
4. En "Environment Variables" agrega:
   - DATABASE_URL = (la cadena de Supabase del Paso 1)
   - FRONTEND_URL = (déjalo vacío por ahora, lo completas después del Paso 3)
   - NODE_ENV = production
5. Clic en "Deploy" — espera 1-2 minutos
6. Copia la URL del backend: https://album-mundial-api.vercel.app (o similar)
7. Prueba que funciona visitando en el navegador:
   https://TU-URL-BACKEND.vercel.app/api/health
   Debe responder: {"estado":"ok","mensaje":"Backend y BD funcionando"}

## Paso 3 — Frontend en Vercel

1. En Vercel, New Project → importa el mismo repositorio de GitHub
   (Vercel permite múltiples proyectos desde el mismo repo)
2. Configuración:
   - Root Directory: frontend
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
3. En "Environment Variables" agrega:
   - VITE_API_URL = https://TU-URL-BACKEND.vercel.app
     (la URL del Paso 2, SIN barra al final)
4. Clic en "Deploy" — espera 1-2 minutos
5. Copia la URL del frontend: https://album-mundial.vercel.app (o similar)

## Paso 4 — Actualizar CORS en el backend

1. Ve al proyecto de backend en Vercel
2. Settings → Environment Variables → edita FRONTEND_URL:
   - FRONTEND_URL = https://TU-URL-FRONTEND.vercel.app
     (la URL del Paso 3, SIN barra al final)
3. Ve a Deployments → los tres puntos del último deploy → Redeploy
4. Espera que termine (~1 minuto)

## Paso 5 — Verificación final

Abre tu URL del frontend y confirma que todo funciona:
- [ ] La página carga sin errores en la consola del navegador (F12)
- [ ] Cambia a "Modo API" y crea un ítem — debe aparecer en la lista
- [ ] Recarga la página — el ítem debe seguir ahí (persistencia en Supabase)
- [ ] Cambia a "Modo Local" — también debe funcionar
- [ ] Las gráficas se muestran con datos
- [ ] El tema claro/oscuro cambia con el botón o atajo de teclado
- [ ] Visita https://TU-URL-BACKEND.vercel.app/api/health — debe responder ok
