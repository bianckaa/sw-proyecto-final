export const initialState = {
  lista: [],
  filtroCategoria: 'todas',
  filtroEstado: 'todos',
  busqueda: '',
}

export function itemsReducer(state, action) {
  switch (action.type) {
    case 'HIDRATAR':
      return { ...state, lista: action.payload }

    case 'ACTUALIZAR':
      return {
        ...state,
        lista: state.lista.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      }

    case 'AGREGAR':
      return { ...state, lista: [...state.lista, action.payload] }

    case 'ELIMINAR':
      return {
        ...state,
        lista: state.lista.map((item) =>
          item.id === action.payload ? { ...item, activo: false } : item
        ),
      }

    case 'CAMBIAR_ESTADO':
      return {
        ...state,
        lista: state.lista.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                estado: item.estado === 'pendiente' ? 'completado' : 'pendiente',
              }
            : item
        ),
      }

    case 'FILTRAR': {
      const { campo, valor } = action.payload
      if (campo === 'categoria') return { ...state, filtroCategoria: valor }
      if (campo === 'estado') return { ...state, filtroEstado: valor }
      if (campo === 'busqueda') return { ...state, busqueda: valor }
      return state
    }

    case 'LIMPIAR_FILTROS':
      return {
        ...state,
        filtroCategoria: 'todas',
        filtroEstado: 'todos',
        busqueda: '',
      }

    case 'REGISTRAR_ACTIVIDAD':
      return {
        ...state,
        lista: state.lista.map((item) =>
          item.id === action.payload.id
            ? { ...item, fechaActividad: action.payload.fechaActividad }
            : item
        ),
      }

    default:
      return state
  }
}
