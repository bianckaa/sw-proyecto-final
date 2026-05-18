const express = require('express')
const router = express.Router()
const db = require('../db/database')

// GET /api/items (devuelve todos los activos)
router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM items WHERE activo = 1').all()
  res.json(items)
})

// POST /api/items (crea un item nuevo)
router.post('/', (req, res) => {
  const item = req.body
  db.prepare(`
    INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.id, item.nombre, item.categoriaId, item.estado, item.puntuacion,
    item.fechaRegistro, item.fechaActividad, item.notas,
    JSON.stringify(item.atributos), item.activo ? 1 : 0
  )
  res.status(201).json(item)
})

module.exports = router