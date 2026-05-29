import { useState, useEffect } from 'react'

/**
 * Hook generico para hacer fetch a cualquier URL con manejo de estados.
 * Incluye AbortController para cancelar peticiones pendientes al desmontar.
 *
 * @param {string|null} url - La URL a consultar. Si es null, no hace la peticion.
 * @returns {{ datos: *, cargando: boolean, error: string|null, recargar: Function }}
 */
export function useFetch(url) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Contador interno que sirve para forzar una nueva ejecucion del useEffect
  // cuando se llama a recargar(), sin necesidad de cambiar la URL
  const [contador, setContador] = useState(0)

  useEffect(() => {
    // Si no hay URL, no hacemos nada (caso util para fetch condicional)
    if (url === null) {
      setCargando(false)
      return
    }

    // El AbortController cancela la peticion si el componente se desmonta antes
    // de que responda el servidor, evitando actualizar estado en componente muerto
    const controlador = new AbortController()

    const traerDatos = async () => {
      setCargando(true)
      setError(null)
      try {
        const res = await fetch(url, { signal: controlador.signal })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const json = await res.json()
        setDatos(json)
      } catch (err) {
        // Si fue cancelacion intencional no actualizamos estado
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    traerDatos()

    // Limpieza: si el componente se desmonta o cambia la url, abortamos
    return () => controlador.abort()
  }, [url, contador])

  // Funcion expuesta para recargar manualmente la peticion
  const recargar = () => setContador((c) => c + 1)

  return { datos, cargando, error, recargar }
}
