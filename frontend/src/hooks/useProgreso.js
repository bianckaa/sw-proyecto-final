import { useMemo } from 'react'

/**
 * Hook de dominio: calcula el progreso de la coleccion del album.
 * Analiza la lista de items para mostrar cuanto del album esta completado.
 *
 * @param {Array} items - El array completo de items activos de la coleccion
 * @param {number} [totalAlbum=670] - Total de estampas que tiene el album oficial
 * @returns {{
 *   totalColectadas: number,
 *   porcentaje: number,
 *   porCategoria: Object,
 *   mejorCalificacion: Object|null,
 *   rachaActual: number
 * }}
 */
export function useProgreso(items, totalAlbum = 670) {
  // useMemo evita recalcular las estadisticas en cada render mientras
  // la lista de items no haya cambiado
  return useMemo(() => {
    const totalColectadas = items.length
    const porcentaje =
      totalAlbum > 0 ? Math.round((totalColectadas / totalAlbum) * 100) : 0

    // Agrupa por categoriaId y cuenta cuantos items hay de cada una
    const porCategoria = items.reduce((acumulador, item) => {
      const categoria = item.categoriaId || 'sin-categoria'
      acumulador[categoria] = (acumulador[categoria] || 0) + 1
      return acumulador
    }, {})

    // Encuentra el item con mayor puntuacion, ignorando null/undefined
    const mejorCalificacion = items.reduce((mejor, item) => {
      if (item.puntuacion == null) return mejor
      if (mejor === null || item.puntuacion > mejor.puntuacion) return item
      return mejor
    }, null)

    // La racha cuenta items completados seguidos mas recientes:
    // ordenamos por fechaActividad descendente y contamos hasta el primer
    // item que no este completado
    const ordenadosPorFecha = [...items].sort((a, b) => {
      const fechaA = a.fechaActividad ? new Date(a.fechaActividad).getTime() : 0
      const fechaB = b.fechaActividad ? new Date(b.fechaActividad).getTime() : 0
      return fechaB - fechaA
    })

    let rachaActual = 0
    for (const item of ordenadosPorFecha) {
      if (item.estado === 'completado') {
        rachaActual += 1
      } else {
        break
      }
    }

    return {
      totalColectadas,
      porcentaje,
      porCategoria,
      mejorCalificacion,
      rachaActual,
    }
  }, [items, totalAlbum])
}
