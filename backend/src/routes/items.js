const express = require('express')
const router = express.Router()
const { randomUUID } = require('crypto')
const { pool } = require('../db/conexion')

// Helper: convierte una fila de Postgres al formato esperado por el frontend.
// Los atributos se guardan como texto JSON, hay que parsearlos antes de enviarlos.
const formatearItem = (fila) => ({
  ...fila,
  atributos: fila.atributos ? JSON.parse(fila.atributos) : {},
  activo: fila.activo === 1
})

// GET /api/items — devuelve todos los items activos
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
<<<<<<< HEAD
      'SELECT * FROM items WHERE activo = $1',
=======
      'SELECT * FROM items WHERE activo = $1 ORDER BY "fechaRegistro" ASC',
>>>>>>> main
      [1]
    )
    res.json(resultado.rows.map(formatearItem))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// GET /api/items/:id — devuelve un item por id
router.get('/:id', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM items WHERE id = $1',
      [req.params.id]
    )
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado' })
    }
    res.json(formatearItem(resultado.rows[0]))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// POST /api/items — crea un item nuevo
router.post('/', async (req, res) => {
  try {
    const item = req.body
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
        JSON.stringify(item.atributos || {}),
        item.activo ? 1 : 0
      ]
    )
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// PUT /api/items/:id — actualiza un item existente
router.put('/:id', async (req, res) => {
  try {
    const item = req.body
    await pool.query(
      `UPDATE items
       SET nombre=$1, "categoriaId"=$2, estado=$3, puntuacion=$4,
           "fechaActividad"=$5, notas=$6, atributos=$7, activo=$8
       WHERE id=$9`,
      [
        item.nombre,
        item.categoriaId,
        item.estado,
        item.puntuacion,
        item.fechaActividad,
        item.notas,
        JSON.stringify(item.atributos || {}),
        item.activo ? 1 : 0,
        req.params.id
      ]
    )
    res.json({ mensaje: 'Item actualizado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// DELETE /api/items/:id — soft delete (activo=0)
router.delete('/:id', async (req, res) => {
  try {
    await pool.query(
      'UPDATE items SET activo = $1 WHERE id = $2',
      [0, req.params.id]
    )
    res.json({ mensaje: 'Item archivado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

<<<<<<< HEAD
=======
// GET /api/items/:id/registros — devuelve el historial de actividad del item
// ordenado del mas reciente al mas antiguo
router.get('/:id/registros', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id, fecha, valor, notas FROM registros WHERE "itemId" = $1 ORDER BY fecha DESC',
      [req.params.id]
    )
    res.json(resultado.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

>>>>>>> main
// POST /api/items/:id/registro — crea un registro de actividad
router.post('/:id/registro', async (req, res) => {
  try {
    const registro = req.body
    await pool.query(
      `INSERT INTO registros (id, "itemId", fecha, valor, notas)
       VALUES ($1, $2, $3, $4, $5)`,
      [randomUUID(), req.params.id, registro.fecha, registro.valor, registro.notas]
    )
    res.status(201).json({ mensaje: 'Registro creado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

module.exports = router
