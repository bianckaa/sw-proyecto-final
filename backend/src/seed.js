require('dotenv').config()
const { randomUUID } = require('crypto')
const { pool, inicializarBD } = require('./db/conexion')

// Seed de 25 estampas para verificar funcionalidades en modo API.
// Ejecutar con: node src/seed.js
// Por defecto agrega los registros; pasar --reset para borrar todo antes.

const CATEGORIAS = ['normal', 'dorada', 'holografica', 'edicion', 'seleccion']
const ESTADOS = ['pendiente', 'completado']
const SELECCIONES = [
  'Argentina', 'Brasil', 'Francia', 'Alemania', 'España',
  'México', 'Guatemala', 'Estados Unidos', 'Canadá', 'Inglaterra',
  'Portugal', 'Países Bajos', 'Italia', 'Uruguay', 'Croacia'
]

const NOMBRES = [
  'Lionel Messi', 'Cristiano Ronaldo', 'Kylian Mbappé', 'Erling Haaland',
  'Vinicius Jr.', 'Jude Bellingham', 'Pedri González', 'Lamine Yamal',
  'Rodrigo De Paul', 'Antoine Griezmann', 'Harry Kane', 'Bukayo Saka',
  'Federico Valverde', 'Luka Modrić', 'Achraf Hakimi', 'Rafael Leão',
  'Phil Foden', 'Florian Wirtz', 'Jamal Musiala', 'Eduardo Camavinga',
  'Julián Álvarez', 'Lautaro Martínez', 'Nico Williams', 'Alexis Mac Allister',
  'Enzo Fernández'
]

// PRNG determinístico para que el seed sea reproducible entre corridas
let semilla = 12345
const random = () => {
  semilla = (semilla * 9301 + 49297) % 233280
  return semilla / 233280
}
const elegir = (arr) => arr[Math.floor(random() * arr.length)]
const entero = (min, max) => Math.floor(random() * (max - min + 1)) + min

const generarItem = (nombre, indice) => {
  const ahora = new Date()
  const diasAtras = entero(0, 13)
  const fechaRegistro = new Date(ahora)
  fechaRegistro.setDate(ahora.getDate() - diasAtras)
  const fechaActividad = new Date(fechaRegistro)
  fechaActividad.setHours(fechaActividad.getHours() + entero(1, 48))

  // Las primeras 5 estampas se fuerzan completadas y recientes para que
  // el hook useProgreso muestre una racha visible al revisar la app
  const fuerzaCompletado = indice < 5
  const estado = fuerzaCompletado ? 'completado' : elegir(ESTADOS)

  return {
    id: randomUUID(),
    nombre,
    categoriaId: elegir(CATEGORIAS),
    estado,
    puntuacion: entero(1, 5),
    fechaRegistro: fechaRegistro.toISOString(),
    fechaActividad: fechaActividad.toISOString(),
    notas: `Estampa de prueba #${indice + 1}`,
    atributos: {
      jugador: nombre,
      numeroEstampa: entero(1, 670),
      seleccion: elegir(SELECCIONES),
      pegada: random() > 0.4,
      repetidas: entero(0, 3)
    },
    activo: 1
  }
}

async function main() {
  await inicializarBD()

  if (process.argv.includes('--reset')) {
    console.log('Borrando items existentes...')
    await pool.query('DELETE FROM registros')
    await pool.query('DELETE FROM items')
  }

  const items = NOMBRES.map(generarItem)
  console.log(`Insertando ${items.length} estampas...`)

  for (const item of items) {
    await pool.query(
      `INSERT INTO items
        (id, nombre, "categoriaId", estado, puntuacion,
         "fechaRegistro", "fechaActividad", notas, atributos, activo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        item.id,
        item.nombre,
        item.categoriaId,
        item.estado,
        item.puntuacion,
        item.fechaRegistro,
        item.fechaActividad,
        item.notas,
        JSON.stringify(item.atributos),
        item.activo
      ]
    )
  }

  console.log('Seed completado.')
  await pool.end()
}

main().catch((error) => {
  console.error('Error en seed:', error)
  pool.end()
  process.exit(1)
})
