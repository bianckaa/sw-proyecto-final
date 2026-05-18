const express = require('express')
const router = express.Router()
const db = require('../db/database')
const { randomUUID } = require('crypto')

// GET /api/items (devuelve todos los activos)
router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM items WHERE activo = 1').all()
  const itemsFormateados = items.map((item) => ({
    ...item,
    atributos: JSON.parse(item.atributos),
    activo: item.activo === 1
  }))
  res.json(itemsFormateados)
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

// PUT /api/items/:id (actualiza un item)
router.put('/:id', (req, res) => {
  const { id } = req.params
  const item = req.body
  db.prepare(`
    UPDATE items SET nombre=?, categoriaId=?, estado=?, puntuacion=?,
    fechaActividad=?, notas=?, atributos=?, activo=?
    WHERE id=?
  `).run(
    item.nombre, item.categoriaId, item.estado, item.puntuacion,
    item.fechaActividad, item.notas, JSON.stringify(item.atributos),
    item.activo ? 1 : 0, id
  )
  res.json({ mensaje: 'Item actualizado' })
})

// DELETE /api/items/:id (archiva un item (soft delete))
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.prepare('UPDATE items SET activo=0 WHERE id=?').run(id)
  res.json({ mensaje: 'Item archivado' })
})

// POST /api/items/:id/registro (crea un registro de actividad)
router.post('/:id/registro', (req, res) => {
  const { id } = req.params
  const registro = req.body
  db.prepare(`
    INSERT INTO registros (id, itemId, fecha, valor, notas)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    randomUUID(), id, registro.fecha, registro.valor, registro.notas
  )
  res.status(201).json({ mensaje: 'Registro creado' })
})

module.exports = router