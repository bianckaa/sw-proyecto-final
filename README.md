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
