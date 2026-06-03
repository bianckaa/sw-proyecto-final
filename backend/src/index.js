require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { pool, inicializarBD } = require('./db/conexion')

const app = express()

// CORS: en produccion usamos la variable de entorno con la URL de Vercel.
// En desarrollo local aceptamos localhost:5173
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend Estampas del Mundial 2026' })
})

// Endpoint de salud: util para verificar que el deploy y la BD estan vivos
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ estado: 'ok', mensaje: 'Backend y BD funcionando' })
  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: error.message })
  }
})

// Rutas de items
app.use('/api/items', require('./routes/items'))

// Solo inicia el servidor si se ejecuta directamente (desarrollo local).
// En Vercel serverless, este archivo se importa como módulo y no debe llamar listen.
if (require.main === module) {
  const PUERTO = process.env.PORT || 3000
  inicializarBD()
    .then(() => {
      app.listen(PUERTO, () => {
        console.log(`Servidor corriendo en puerto ${PUERTO}`)
      })
    })
    .catch((error) => {
      console.error('Error al inicializar la base de datos:', error)
      process.exit(1)
    })
}

module.exports = app
