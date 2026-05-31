const { inicializarBD } = require('../backend/src/db/conexion')
const app = require('../backend/src/index')

// Inicializa la BD una sola vez por instancia del contenedor serverless.
// En produccion Vercel inyecta las variables de entorno directamente.
const initPromise = inicializarBD()

module.exports = async (req, res) => {
  await initPromise
  return app(req, res)
}
