import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import Coleccion from './components/Coleccion'

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const agregarItem = (nuevoItem) => { 
    // Copia todos los items existentes y agrega nuevo al final 
    const listaActualizada = [...items, nuevoItem]   // ... copia todo el contenido de aqui
    setItems(listaActualizada)
  }

  const eliminarItem = (id) => { 
    const listaActualizada = items.map((item) => {     /* .map() recorre todos los items*/
      // si el id coincide
      if (item.id == id) {
        return {...item, 
                activo: false
              }
      } else { // si no coincide
        return item
      }
    })
    setItems(listaActualizada)
  }

  const editarItem = (id, datosActualizados) => { 
    const listaActualizada = items.map((item) => {    
      if (item.id == id) {
        return {...item, ...datosActualizados} // copia el item y sobreescribe con nuevos datos
      } else { 
        return item
      }
    })
    setItems(listaActualizada)
  }

  return(
    <div>
      <h1>Albúm Copa Mundial de Fútbol 2026</h1>

      <Formulario onAgregar={agregarItem}/> {/*Como es componente sin contenido adentro, se puede cerrar en una sola línea*/}

      <Coleccion 
        items={items} 
        onEditar={editarItem}
        onEliminar={eliminarItem}
      />
    </div>
  )
}

export default App