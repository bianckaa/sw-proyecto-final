const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend Estampas del Mundial 2026' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})