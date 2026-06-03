const { inicializarBD } = require('../backend/src/db/conexion')
const app = require('../backend/src/index')

// Inicializa la BD al arrancar el contenedor. Si falla (ej: DATABASE_URL no
// configurada), guardamos el error y lo reportamos en /api/health en lugar de
// tumbar toda la funcion con un crash invisible.
let errorInicializacion = null
const initPromise = inicializarBD().catch(err => {
  errorInicializacion = err
  console.error('Error al inicializar BD:', err.message)
})

module.exports = async (req, res) => {
  await initPromise

  if (errorInicializacion) {
    // Si el health check falla por BD, devolver un 503 descriptivo en lugar de crash
    return res.status(503).json({
      estado: 'error',
      mensaje: 'No se pudo conectar a la base de datos',
      detalle: errorInicializacion.message
    })
  }

  return app(req, res)
}
