import { createContext, useContext, useState } from 'react'

const StorageContext = createContext(null)

const API_URL = 'http://localhost:3000/api/items'
const CLAVE_LOCAL = 'items'

export function StorageProvider({ children }) {
  const [modo, setModoState] = useState(
    () => localStorage.getItem('modo') || 'local'
  )

  const setModo = (nuevoModo) => {
    localStorage.setItem('modo', nuevoModo)
    setModoState(nuevoModo)
  }

  // Helpers de localStorage (solo usados internamente por el provider)
  const leerLocal = () =>
    JSON.parse(localStorage.getItem(CLAVE_LOCAL) || '[]')

  const escribirLocal = (items) =>
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(items))

  const obtenerItems = async () => {
    if (modo === 'api') {
      const res = await fetch(API_URL)
      return await res.json()
    } else {
      return leerLocal()
    }
  }

  const guardarItem = async (item) => {
    if (modo === 'api') {
      // Determina si es creación o actualización segun exista el id
      const res = await fetch(API_URL)
      const items = await res.json()
      const existe = items.some((i) => i.id === item.id)

      if (existe) {
        await fetch(`${API_URL}/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      }
    } else {
      const items = leerLocal()
      const indice = items.findIndex((i) => i.id === item.id)
      if (indice >= 0) {
        items[indice] = { ...items[indice], ...item }
      } else {
        items.push(item)
      }
      escribirLocal(items)
    }
  }

  const eliminarItem = async (id) => {
    if (modo === 'api') {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    } else {
      const items = leerLocal()
      const actualizados = items.map((item) =>
        item.id === id ? { ...item, activo: false } : item
      )
      escribirLocal(actualizados)
    }
  }

  return (
    <StorageContext.Provider
      value={{ modo, setModo, obtenerItems, guardarItem, eliminarItem }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => useContext(StorageContext)
