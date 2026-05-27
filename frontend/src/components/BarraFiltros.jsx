import { CATEGORIAS } from '../utils/categorias'

function BarraFiltros({ filtroCategoria, filtroEstado, busqueda, dispatch }) {
  const cambiarCampo = (campo, valor) => {
    dispatch({ type: 'FILTRAR', payload: { campo, valor } })
  }

  return (
    <div className="barra-filtros">
      <input
        type="text"
        className="filtro-busqueda"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => cambiarCampo('busqueda', e.target.value)}
      />

      <select
        className="filtro-categoria"
        value={filtroCategoria}
        onChange={(e) => cambiarCampo('categoria', e.target.value)}
        aria-label="Filtrar por categoría"
      >
        <option value="todas">Todas las categorías</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.emoji} {cat.nombre}
          </option>
        ))}
      </select>

      <select
        className="filtro-estado"
        value={filtroEstado}
        onChange={(e) => cambiarCampo('estado', e.target.value)}
        aria-label="Filtrar por estado"
      >
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>

      <button
        type="button"
        className="boton-limpiar-filtros"
        onClick={() => dispatch({ type: 'LIMPIAR_FILTROS' })}
      >
        Limpiar filtros
      </button>
    </div>
  )
}

export default BarraFiltros
