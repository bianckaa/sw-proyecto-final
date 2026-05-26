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
tema claro y otra para el tema oscuro, de modo que toda la interfaz cambia con
solo alternar el atributo `data-theme` del `body`.

### Tema claro
| Variable          | Hex       | Justificación |
|-------------------|-----------|---------------|
| --color-bg        | #FFFFFF   | Fondo blanco y limpio que evoca la claridad de un estadio iluminado al mediodía. Aporta máxima legibilidad y deja que los colores del Mundial resalten sin competir con el fondo. |
| --color-surface   | #F2F2F2   | Gris muy claro para las tarjetas y el formulario. Diferencia las superficies del fondo sin perder luminosidad ni introducir un contraste agresivo. |
| --color-primary   | #1B4FBB   | Azul institucional de la FIFA. Refuerza la identidad del torneo y se usa en títulos, etiquetas y el botón de tema como color de marca dominante. |
| --color-accent    | #E8192C   | Rojo de acción y alerta, tomado del logo oficial del Mundial 2026. Marca los botones principales como guardar y eliminar para llamar la atención del usuario. |
| --color-success   | #009B3A   | Verde de cancha que representa el gol y la tarea completada. Comunica de forma intuitiva los estados positivos o finalizados. |
| --color-warn      | #FFCC00   | Amarillo de tarjeta de árbitro. Señala ítems pendientes o que requieren atención y aporta un acento vibrante muy asociado al fútbol. |

### Tema oscuro
| Variable          | Hex       | Justificación |
|-------------------|-----------|---------------|
| --color-bg        | #0D0D0D   | Negro casi puro que simula el estadio durante un partido nocturno. Reduce la fatiga visual y hace que los colores vivos del torneo destaquen aún más. |
| --color-surface   | #1A1A1A   | Gris muy oscuro para tarjetas y formulario. Ofrece suficiente contraste con el fondo negro sin recurrir al blanco, manteniendo la estética nocturna. |
| --color-primary   | #5A80E0   | Azul aclarado respecto al tema claro para conservar la legibilidad sobre fondo oscuro, donde un azul saturado perdería visibilidad. |
| --color-accent    | #FF4D5E   | Rojo más brillante y cálido que resalta las acciones principales en modo oscuro, evitando que el rojo original se apague sobre el negro. |
| --color-success   | #33C96A   | Verde vibrante que mantiene su visibilidad y significado de éxito incluso en pantallas oscuras, donde el verde original resultaría demasiado apagado. |
| --color-warn      | #FFD740   | Amarillo intenso y luminoso, perfectamente legible sobre fondos casi negros, conservando su función de aviso y atención. |

## Cómo probar los atajos de teclado

| Atajo  | Acción                           | Nota |
|--------|----------------------------------|------|
| Ctrl+N | Enfocar el campo de nombre       | Requiere abrir la app en modo aplicación para evitar conflicto con Chrome: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --app=http://localhost:5173` |
| T      | Alternar entre tema claro/oscuro | Funciona directamente en el navegador |
