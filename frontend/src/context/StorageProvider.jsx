import { createContext, useContext, useState } from 'react'

const StorageContext = createContext(null)

// La URL base del backend se puede configurar con VITE_API_URL.
// Si no esta definida, queda vacia y el fetch usa rutas relativas:
//   - en dev, Vite hace proxy /api/* -> localhost:3000
//   - en prod (Vercel mono-proyecto), /api/* lo sirve el mismo dominio
const URL_BASE = import.meta.env.VITE_API_URL || ''
const API_URL = `${URL_BASE}/api/items`
const CLAVE_LOCAL = 'items'

// Prefijo de la clave de localStorage donde se guarda el historial de
// actividad diaria por item. Ej: "registros_<itemId>"
const PREFIJO_REGISTROS = 'registros_'

export function StorageProvider({ children }) {
  const [modo, setModoState] = useState(
    () => localStorage.getItem('modo') || 'local'
  )

  // Mensaje de error visible al usuario cuando el backend no responde.
  // Los componentes lo leen via useStorage() y lo muestran en un banner.
  const [error, setError] = useState(null)

  const setModo = (nuevoModo) => {
    localStorage.setItem('modo', nuevoModo)
    setModoState(nuevoModo)
  }

  // Helpers de localStorage (solo usados internamente por el provider)
  const leerLocal = () =>
    JSON.parse(localStorage.getItem(CLAVE_LOCAL) || '[]')

  const escribirLocal = (items) =>
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(items))

  // Centraliza el manejo de errores de red en modo API para que cada componente
  // no tenga que envolver sus llamadas en try/catch
  const manejarErrorAPI = (err) => {
    console.error(err)
    setError('No se pudo conectar con el servidor. Revisa tu conexión o cambia a Modo Local.')
  }

  const limpiarError = () => setError(null)

  const obtenerItems = async () => {
    if (modo === 'api') {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        limpiarError()
        return await res.json()
      } catch (err) {
        manejarErrorAPI(err)
        return []
      }
    } else {
      return leerLocal()
    }
  }

  const guardarItem = async (item) => {
    if (modo === 'api') {
      try {
        // Determina si es creación o actualización segun exista el id
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const items = await res.json()
        const existe = items.some((i) => i.id === item.id)

        const respuesta = existe
          ? await fetch(`${API_URL}/${item.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            })
          : await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        limpiarError()
      } catch (err) {
        manejarErrorAPI(err)
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
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        limpiarError()
      } catch (err) {
        manejarErrorAPI(err)
      }
    } else {
      const items = leerLocal()
      const actualizados = items.map((item) =>
        item.id === id ? { ...item, activo: false } : item
      )
      escribirLocal(actualizados)
    }
  }

  // RF-03: Registra una entrada de actividad diaria para un item.
  // En modo API llama a POST /api/items/:id/registro
  // En modo Local guarda en la clave registros_<itemId> de localStorage
  const registrarActividad = async (itemId, registro) => {
    if (modo === 'api') {
      try {
        const res = await fetch(`${API_URL}/${itemId}/registro`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registro),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        limpiarError()
      } catch (err) {
        manejarErrorAPI(err)
      }
    } else {
      const claveItem = PREFIJO_REGISTROS + itemId
      const previos = JSON.parse(localStorage.getItem(claveItem) || '[]')
      previos.push(registro)
      localStorage.setItem(claveItem, JSON.stringify(previos))
    }
  }

  // RF-03: Lee el historial de registros de un item.
  // En modo API llama a GET /api/items/:id/registros
  // En modo Local lee la clave registros_<itemId> de localStorage
  const obtenerRegistros = async (itemId) => {
    if (modo === 'api') {
      try {
        const res = await fetch(`${API_URL}/${itemId}/registros`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        limpiarError()
        return await res.json()
      } catch (err) {
        manejarErrorAPI(err)
        return []
      }
    } else {
      const claveItem = PREFIJO_REGISTROS + itemId
      return JSON.parse(localStorage.getItem(claveItem) || '[]')
    }
  }

  return (
    <StorageContext.Provider
      value={{
        modo,
        setModo,
        error,
        limpiarError,
        obtenerItems,
        guardarItem,
        eliminarItem,
        registrarActividad,
        obtenerRegistros,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => useContext(StorageContext)
