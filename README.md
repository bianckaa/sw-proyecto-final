# Estampas del Mundial 2026 ⚽

## Descripción
Aplicación web para gestionar una colección de estampas del Mundial 2026. 
Permite registrar, editar y archivar estampas con información como el jugador, selección, categoría, si ya está pegada en el álbum o si se tiene repetida. 

## Tecnologías utilizadas
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: SQLite (better-sqlite3)
- Persistencia local: LocalStorage

## Cómo correr el proyecto

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Abre http://localhost:5173 en el navegador.

### Backend
```bash
cd backend
npm install
node src/index.js
```
El servidor corre en http://localhost:3000.

## Endpoints disponibles
| Verbo | Ruta | Descripción |
|---|---|---|
| GET | /api/items | Devuelve todas las estampas activas |
| POST | /api/items | Crea una estampa nueva |
| PUT | /api/items/:id | Actualiza una estampa |
| DELETE | /api/items/:id | Archiva una estampa |
| POST | /api/items/:id/registro | Crea un registro de actividad |

## Mis primeros Items
A continuación se muestran las primeras estampas reales registradas en la aplicación:

![Estampas](./assets/img/captura_items.png)

## Mi paleta de colores

La paleta se inspira en la identidad visual oficial de la FIFA World Cup 2026:
azul, rojo, verde y amarillo. Cada variable se define dos veces, una para el
tema claro y otra para el tema oscuro.

### Tema claro
| Variable          | Hex       | Justificación |
|-------------------|-----------|---------------|
| --color-bg        | #FFFFFF   | Se eligió un fondo blanco porque da claridad y mejora la lectura del contenido. Además, permite que los colores principales del tema resalten fácilmente. |
| --color-surface   | #F2F2F2   | Ayuda a diferenciar tarjetas y formularios del fondo principal sin generar un contraste demasiado fuerte. Este gris claro crea una jerarquía visual sutil que guía al usuario sin distraerlo del contenido. |
| --color-primary   | #1B4FBB   | Se tomó como referencia de los colores asociados a la FIFA y al Mundial. Se usa como color principal en títulos y elementos importantes de la interfaz. |
| --color-accent    | #E8192C   | Se utiliza para botones y acciones importantes porque llama la atención del usuario de forma rápida. Este rojo también está presente en la identidad gráfica oficial del Mundial 2026, lo que refuerza la coherencia visual del proyecto. |
| --color-success   | #009B3A   | Representa estados positivos o tareas completadas y se relaciona fácilmente con el contexto del fútbol y la cancha. Este verde también diferencia visualmente el chip de "Pegada en el álbum" del resto de los controles del formulario. |
| --color-warn      | #FFCC00   | Se eligió para advertencias o tareas pendientes porque destaca visualmente y se asocia con atención o precaución. Además, este amarillo aparece en varios escudos y uniformes de selecciones participantes, lo que lo integra temáticamente al proyecto. |

### Tema oscuro
| Variable          | Hex       | Justificación |
|-------------------|-----------|---------------|
| --color-bg        | #0D0D0D   | Se eligió un fondo oscuro para reducir la fatiga visual y dar una apariencia más moderna a la interfaz. Este negro casi puro maximiza el contraste con el texto claro y disminuye el consumo energético en pantallas OLED. |
| --color-surface   | #1A1A1A   | Permite diferenciar las tarjetas y formularios del fondo sin perder la estética del tema oscuro. El ligero contraste con el fondo principal crea profundidad visual sin recurrir a colores llamativos. |
| --color-primary   | #5A80E0   | Azul aclarado respecto al tema claro para mantener una buena visibilidad sobre fondos oscuros. El incremento de luminosidad garantiza que los títulos y enlaces sigan siendo legibles sin saturar la vista. |
| --color-accent    | #FF4D5E   | Rojo más brillante para que las acciones principales sigan destacando correctamente en el modo oscuro. Este ajuste compensa la menor reflectancia del fondo oscuro y mantiene la jerarquía visual del tema claro. |
| --color-success   | #33C96A   | Este verde mantiene buena visibilidad en fondos oscuros y sigue representando acciones exitosas o completadas. Su tono más vivo respecto al tema claro compensa la absorción de luz del fondo oscuro. |
| --color-warn      | #FFD740   | Amarillo ligeramente más cálido que el del tema claro para que las advertencias sean fáciles de identificar dentro del modo oscuro. El cambio de tono evita el efecto de "lavado" que produce el amarillo puro sobre superficies muy oscuras. |

## Cómo probar los atajos de teclado

| Atajo  | Acción                           | Nota |
|--------|----------------------------------|------|
| Ctrl+N | Enfocar el campo de nombre       | Requiere abrir la app en modo aplicación para evitar conflicto con Chrome: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --app=http://localhost:5173` |
| T      | Alternar entre tema claro/oscuro | Funciona directamente en el navegador |
