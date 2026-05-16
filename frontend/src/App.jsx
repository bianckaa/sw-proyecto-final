import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Formulario from './components/Formulario'

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const agregarItem = (nuevoItem) => { 
    const listaActualizada = [...items, nuevoItem]     // Copia todos los items existentes y agrega nuevo al final 
    setItems(listaActualizada)
  }

  return(
    <div>
      <h1>Estampas del Mundial 2026</h1>

      <Formulario onAgregar={agregarItem}/> {/*Como es componente sin contenido adentro, se puede cerrar en una sola línea*/}

    </div>
  )
}

export default App