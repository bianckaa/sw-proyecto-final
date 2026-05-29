import { useState, useEffect } from 'react'

/**
 * Hook que sincroniza un estado de React con localStorage.
 * Evita repetir el patrón useState + useEffect en cada componente que necesite persistencia.
 *
 * @param {string} clave - La clave bajo la que se guarda el valor en localStorage
 * @param {*} valorInicial - El valor a usar si la clave no existe todavía
 * @returns {[*, Function]} Un array con [valorActual, funcionParaActualizar]
 */
export function useLocalStorage(clave, valorInicial) {
  // Inicializador lazy: la funcion flecha se ejecuta SOLO en el primer render.
  // Si pasaramos el valor directo, JSON.parse correria en cada render aunque
  // ya hubiera un estado guardado.
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave)
    if (guardado === null) return valorInicial
    try {
      return JSON.parse(guardado)
    } catch {
      // Si el valor existente no es JSON valido (por ejemplo una string vieja),
      // lo devolvemos tal cual para no romper sesiones anteriores
      return guardado
    }
  })

  // Cada vez que cambia el valor (o la clave), lo sincronizamos con localStorage
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])

  return [valor, setValor]
}
