import { useEffect } from 'react'

/**
 * Hook que registra atajos de teclado y los limpia automaticamente al desmontar.
 * Reemplaza el patron repetitivo de addEventListener/removeEventListener en useEffect.
 *
 * Las claves del objeto soportan modificadores con el prefijo "ctrl+":
 *   - 'n'        → tecla N sola
 *   - 'ctrl+n'   → Ctrl + N (en macOS tambien acepta Cmd + N)
 *   - 'Escape'   → tecla Escape sola
 *
 * @param {Object} atajos - Objeto donde la clave es la combinacion y el valor es la funcion
 *   Ejemplo: { 'ctrl+n': abrirFormulario, 'Escape': cerrarModal, 't': toggleTema }
 * @param {boolean} [activo=true] - Si es false, los atajos no responden
 * @returns {void}
 */
export function useAtajoTeclado(atajos, activo = true) {
  useEffect(() => {
    const manejarTecla = (evento) => {
      if (!activo) return

      const conModificador = evento.ctrlKey || evento.metaKey

      // Atajos de tecla sola (sin Ctrl/Cmd) no se activan si el usuario
      // está escribiendo en un input, textarea o select, para no interferir
      // con la escritura normal
      if (!conModificador) {
        const tag = evento.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      }

      // Construye la clave que debe coincidir con el objeto de atajos.
      // Si hay Ctrl (o Cmd en macOS), antepone "ctrl+" a la tecla pulsada.
      const claveBuscada = conModificador
        ? `ctrl+${evento.key.toLowerCase()}`
        : evento.key

      const funcionAtajo = atajos[claveBuscada]
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
