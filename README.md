# Álbum Estampas del Mundial de Fútbol 2026 ⚽ 

Aplicación web para gestionar una colección de estampas del Mundial 2026. Permite registrar, editar y archivar estampas con información como el jugador, selección, categoría, si ya está pegada en el álbum o si se tiene repetida.

| Servicio | Plataforma | URL / Referencia |
|----------|------------|-----------------|
| Frontend | Vercel | [https://album-estampas.vercel.app/](https://album-estampas.vercel.app/) |
| Backend API | Render | [https://sw-proyecto-final.onrender.com](https://sw-proyecto-final.onrender.com) |
| Base de datos | Supabase | Proyecto `ebutwsctfawwhesbwkdk`, conexión configurada en Render vía `DATABASE_URL` |


## Screenshots

### Modo claro
![Captura modo claro](./docs/img/captura_claro.png)

### Modo oscuro
![Captura modo oscuro](./docs/img/captura_oscuro.png)


## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite | React 19 / Vite 8 |
| Estilos | CSS puro con variables CSS | — |
| Gráficas | Recharts | 2.x |
| Íconos | react-icons | 5.x |
| Estado | useState / useContext / useReducer | (hooks nativos de React) |
| Backend | Node.js + Express | Express 5.x |
| Base de datos | PostgreSQL (Supabase, vía `pg`) | 15.x |
| Deploy frontend | Vercel | — |
| Deploy backend | Render | — |


## Cómo correr el proyecto localmente

Necesitás tener instalado Node.js 18+ y dos terminales abiertas al mismo tiempo.

### 1. Clonar el repositorio

```bash
git clone https://github.com/bianckaa/sw-proyecto-final
cd sw-proyecto-final
```

### 2. Levantar el backend (Terminal 1)

```bash
cd backend
cp .env.example .env
# Editar .env y reemplazar DATABASE_URL con la cadena de conexión de Supabase
npm install
node src/index.js
```

Verificar en: `http://localhost:3000/api/health`

### 3. Levantar el frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

La app queda en `http://localhost:5173`.

### Endpoints disponibles

| Verbo | Ruta | Descripción |
|-------|------|-------------|
| GET | `/api/health` | Verifica que el backend y la base de datos respondan correctamente |
| GET | `/api/items` | Devuelve todas las estampas activas |
| POST | `/api/items` | Crea una estampa nueva |
| PUT | `/api/items/:id` | Actualiza una estampa existente |
| DELETE | `/api/items/:id` | Archiva una estampa (soft delete) |
| POST | `/api/items/:id/registro` | Agrega un registro de actividad |
| GET | `/api/items/:id/registros` | Devuelve el historial de actividad de una estampa |

---

## Mis primeros ítems (Fase 1)
A continuación se muestran las primeras estampas reales registradas en la aplicación:

![Estampas](./docs/img/captura_items.png)

---

## Mi paleta de colores (Fase 2)

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

---

## Gráfica original + decisiones técnicas (Fase 3)

### Mi gráfica original

La tercera gráfica es un BarChart horizontal que muestra
el top 5 de selecciones nacionales con más estampas en mi colección. Agrupa los
items por `atributos.seleccion`, cuenta cuántos hay por selección, ordena
descendente y se queda con las 5 primeras.

*Por qué la elegí para el tema del álbum del Mundial 2026*: el álbum se completa
por selecciones, no por categorías visuales. Saber qué selecciones tengo más
avanzadas me dice cuáles puedo terminar pronto y, por contraste, qué
selecciones casi no aparecen me indica dónde tengo que enfocarme para no quedarme
atorada al final con países difíciles de conseguir.

![Gráfica puntuación por categoría](./docs/img/grafica_puntuacion_categoria.png)

### Mis 3 decisiones técnicas

#### (1) Estructura del reducer
Separé las acciones en tres grupos: hidratación (`HIDRATAR`), mutaciones sobre la
lista (`AGREGAR`, `ELIMINAR`, `CAMBIAR_ESTADO`, `REGISTRAR_ACTIVIDAD`) y filtros
(`FILTRAR`, `LIMPIAR_FILTROS`). `FILTRAR` recibe `{ campo, valor }` en lugar de
crear una acción por cada filtro, ya que esto evita repetir tres acciones casi idénticas
y mantiene el `switch` corto.

#### (2) Acción más difícil
`ELIMINAR` fue la más difícil porque la rúbrica pide *soft delete* (`activo=false`)
y no remover del array. Lo resolví usando `.map()` para
clonar la lista y solo voltear `activo` del item afectado permitiendo restaurar items en el futuro.

#### (3) Gráfica más compleja
La `GraficaActividad` fue la más compleja porque tiene que rellenar días vacíos
con cero. Construyo primero un arreglo base de 7 días con `cantidad: 0` usando
`new Date()` y `setDate(hoy - i)`, luego recorro `listaFiltrada` y sumo +1 al día
que coincide con `fechaRegistro`. Esto hace que la barra de un día
sin registros aparezca como espacio visible y no se "salte" del eje X.


## Performance con React Profiler (Fase 3)

### Capturas

**Antes de la optimización**
![Profiler antes](./docs/img/profiler-antes.png)

**Después de la optimización** 
![Profiler después](./docs/img/profiler-despues.png)

### Análisis

Antes de la optimización, escribir una sola letra en el buscador disparaba el
re-render de los 25 Cards, aunque ninguno de ellos hubiera cambiado. Esto ocurría
porque `listaFiltrada` se recalculaba en cada render de `Contenido` produciendo una
nueva referencia de array, y los handlers `onEliminar` y `onCambiarEstado` también
se recreaban, lo que hacía que `React.memo` no pudiera comparar las props
correctamente. Después de envolver `Card` con `React.memo`, memoizar `listaFiltrada`
con `useMemo` y estabilizar los handlers con `useCallback`, los Cards reciben
exactamente las mismas referencias de props entre renders y React los omite por
completo, reduciendo el tiempo de commit de ~197 ms a ~3 ms por pulsación de tecla.

---

## Custom Hooks implementados (Fase 4)

Los cuatro hooks personalizados viven en `frontend/src/hooks/` y reemplazan patrones repetitivos que antes vivían inline dentro de los componentes.

| Hook | Archivo | Qué hace | Se usa en |
|------|---------|----------|-----------|
| `useLocalStorage` | `frontend/src/hooks/useLocalStorage.js` | Sincroniza un estado de React con `localStorage` usando inicializador lazy y `JSON.parse` seguro. Cada vez que cambia el valor lo escribe automáticamente en el storage. | `ThemeProvider.jsx` (tema claro/oscuro) y `App.jsx` (nombre de usuario persistido) |
| `useFetch` | `frontend/src/hooks/useFetch.js` | Hook genérico de fetch con estados `datos`/`cargando`/`error`, función `recargar()` y `AbortController` que cancela la petición si el componente se desmonta. | Disponible para futuras vistas — no se invoca todavía desde un componente |
| `useAtajoTeclado` | `frontend/src/hooks/useAtajoTeclado.js` | Registra atajos de teclado declarativos (incluye soporte para `ctrl+<tecla>`) y limpia el listener automáticamente al desmontar. | `App.jsx` — registra `ctrl+n` (enfocar nombre) y `t` (alternar tema) |
| `useProgreso` | `frontend/src/hooks/useProgreso.js` | Hook de dominio que calcula estadísticas del álbum a partir de la lista de ítems: total coleccionadas, porcentaje sobre el total oficial, agrupación por categoría, mejor calificación y racha actual de estampas completadas. | `App.jsx` — alimenta el indicador `"Colección: X estampas · Y% del álbum · racha de Z completadas"` |


## Sobre mí

**Nombre:** Biancka Mery Alessandra Raxón Ajcuc
**Carnet:** 24960
**Semestre:** Quinto semestre

### Reflexión

El curso me permitió comprender cómo se relacionan el frontend y el backend dentro de una aplicación web completa. React fue la parte que más se me complicó, especialmente al trabajar con el manejo de estado mediante `useReducer`. Finalizando este proyecto, entendí la importancia de mantener una estructura organizada y escalable para desarrollar aplicaciones complejas.


## Video de demostración

[Ver video](https://youtu.be/Zb7e4DGyd5I)