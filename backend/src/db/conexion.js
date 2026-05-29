const { Pool } = require('pg')

// Pool de conexiones a PostgreSQL.
// En desarrollo: apunta a Supabase usando DATABASE_URL del .env
// En produccion: Render lee DATABASE_URL de sus variables de entorno
// SSL es obligatorio en Supabase tanto en desarrollo como en produccion
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// Crea las tablas si no existen. Se llama una vez al arrancar el servidor.
const inicializarBD = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id             TEXT PRIMARY KEY,
      nombre         TEXT NOT NULL,
      "categoriaId"  TEXT,
      estado         TEXT,
      puntuacion     REAL,
      "fechaRegistro"  TEXT,
      "fechaActividad" TEXT,
      notas          TEXT,
      atributos      TEXT,
      activo         INTEGER DEFAULT 1
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registros (
      id       TEXT PRIMARY KEY,
      "itemId" TEXT NOT NULL,
      fecha    TEXT,
      valor    REAL,
      notas    TEXT
    )
  `)
  console.log('Base de datos PostgreSQL lista')
}

module.exports = { pool, inicializarBD }
