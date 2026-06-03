import { useEffect } from 'react'

/**
 * Hook que registra atajos de teclado y los limpia automaticamente al desmontar.
 * Reemplaza el patron repetitivo de addEventListener/removeEventListener en useEffect.
 *
 * @param {Object} atajos - Objeto donde la clave es la tecla y el valor es la funcion
 *   Ejemplo: { 'n': abrirFormulario, 'Escape': cerrarModal, 't': toggleTema }
 * @param {boolean} [activo=true] - Si es false, los atajos no responden
 * @returns {void}
 */
export function useAtajoTeclado(atajos, activo = true) {
  useEffect(() => {
    const manejarTecla = (evento) => {
      if (!activo) return
      const funcionAtajo = atajos[evento.key]
      if (funcionAtajo) {
        evento.preventDefault()
        funcionAtajo()
      }
    }

    window.addEventListener('keydown', manejarTecla)

    // Limpieza al desmontar o al cambiar los atajos
    return () => window.removeEventListener('keydown', manejarTecla)
    // Incluimos atajos en dependencias porque si cambia el objeto,
    // necesitamos registrar el listener con las funciones actualizadas
  }, [atajos, activo])
}
