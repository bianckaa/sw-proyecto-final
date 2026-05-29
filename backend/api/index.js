require('dotenv').config()
const { inicializarBD } = require('../src/db/conexion')
const app = require('../src/index')

// Inicializa la BD una sola vez por instancia del contenedor serverless.
// CREATE TABLE IF NOT EXISTS es idempotente, así que reintentos son seguros.
const initPromise = inicializarBD()

module.exports = async (req, res) => {
  await initPromise
  return app(req, res)
}
