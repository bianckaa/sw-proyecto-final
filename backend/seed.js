const Database = require('better-sqlite3')
const path = require('path')
const { randomUUID } = require('crypto')

const db = new Database(path.join(__dirname, 'estampas.sqlite'))

const CATEGORIAS = ['normal', 'dorada', 'holografica', 'edicion', 'seleccion']
const SELECCIONES = [
  'Argentina', 'Brasil', 'Francia', 'España', 'Inglaterra',
  'Alemania', 'Portugal', 'México', 'Guatemala', 'Países Bajos'
]
const JUGADORES = [
  'Messi', 'Neymar', 'Mbappé', 'Pedri', 'Bellingham',
  'Müller', 'Ronaldo', 'Lozano', 'Ceballos', 'De Jong',
  'Vinícius', 'Griezmann', 'Yamal', 'Foden', 'Kroos',
  'Bruno', 'Chicharito', 'Gakpo', 'Salah', 'Lewandowski',
  'Modric', 'Kane', 'Osimhen', 'Diaz', 'Pulisic'
]

db.prepare('DELETE FROM items').run()
console.log('Tabla limpiada. Insertando 25 estampas...')

const stmt = db.prepare(`
  INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const hoy = new Date()

for (let i = 0; i < JUGADORES.length; i++) {
  const fecha = new Date(hoy)
  fecha.setDate(hoy.getDate() - (i % 7))
  stmt.run(
    randomUUID(),
    `${JUGADORES[i]} - estampa #${i + 1}`,
    CATEGORIAS[i % CATEGORIAS.length],
    i % 3 === 0 ? 'completado' : 'pendiente',
    (i % 10) + 1,
    fecha.toISOString(),
    fecha.toISOString(),
    `Notas de prueba ${i + 1}`,
    JSON.stringify({
      numeroEstampa: String(i + 1).padStart(3, '0'),
      seleccion: SELECCIONES[i % SELECCIONES.length],
      jugador: JUGADORES[i],
      pegada: i % 2 === 0,
      repetidas: i % 4
    }),
    1
  )
  console.log(i + 1, JUGADORES[i])
}

const total = db.prepare('SELECT COUNT(*) as c FROM items WHERE activo=1').get()
console.log('\nTotal insertado:', total.c, 'estampas')
