import { useReducer, useEffect, useRef, useMemo, useCallback, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import './App.css'
import Formulario from './components/Formulario'
import Coleccion from './components/Coleccion'
import BarraFiltros from './components/BarraFiltros'
import EstadisticasResumen from './components/EstadisticasResumen'
import PanelGraficas from './components/graficas/PanelGraficas'
import { StorageProvider, useStorage } from './context/StorageProvider'
import { ThemeProvider, useTheme } from './context/ThemeProvider'
import { itemsReducer, initialState } from './reducers/itemsReducer'
import { CATEGORIAS } from './utils/categorias'
import { useAtajoTeclado } from './hooks/useAtajoTeclado'
import { useProgreso } from './hooks/useProgreso'
import { useLocalStorage } from './hooks/useLocalStorage'

function Contenido() {
  const { modo, setModo, obtenerItems, eliminarItem, error, limpiarError } = useStorage()
  const { tema, toggleTema } = useTheme()
  const [state, dispatch] = useReducer(itemsReducer, initialState)
  const { lista, filtroCategoria, filtroEstado, busqueda } = state

  const nombreRef = useRef(null)

  // Reloj en tiempo real: guardamos el ID del intervalo en un ref para
  // poder cancelarlo al desmontar sin provocar re-renders con cada tick
  const intervalRef = useRef(null)
  const [horaTexto, setHoraTexto] = useState(
    () => new Date().toLocaleTimeString('es-GT')
  )
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHoraTexto(new Date().toLocaleTimeString('es-GT'))
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  // RF-06: perfil de usuario con nombre persistido en localStorage.
  // El hook useLocalStorage mantiene el valor sincronizado entre recargas.
  const [nombreUsuario, setNombreUsuario] = useLocalStorage('nombreUsuario', '')

  // RF-06: saludo dinamico segun la hora del dia.
  // Si el usuario ya escribio su nombre, lo agregamos al saludo.
  const horaActual = new Date().getHours()
  const saludoBase =
    horaActual < 12
      ? 'Buenos días'
      : horaActual < 18
      ? 'Buenas tardes'
      : 'Buenas noches'
  const saludo = nombreUsuario
    ? `${saludoBase}, ${nombreUsuario}`
    : `${saludoBase}, bienvenida a tu álbum`

  const recargar = useCallback(async () => {
    const data = await obtenerItems()
    dispatch({ type: 'HIDRATAR', payload: data })
  }, [obtenerItems])

  useEffect(() => {
    recargar()
  }, [modo])

  // Atajos de teclado declarativos: Ctrl+N enfoca el campo nombre del
  // formulario y la tecla T sola alterna entre tema claro y oscuro
  const atajos = useMemo(
    () => ({
      'ctrl+n': () => nombreRef.current?.focus(),
      t: toggleTema,
    }),
    [toggleTema]
  )
  useAtajoTeclado(atajos)

  const listaFiltrada = useMemo(() => {
    return state.lista.filter((item) => {
      const coincideCategoria =
        state.filtroCategoria === 'todas' || item.categoriaId === state.filtroCategoria
      const coincideEstado =
        state.filtroEstado === 'todos' || item.estado === state.filtroEstado
      const coincideBusqueda = item.nombre
        .toLowerCase()
        .includes(state.busqueda.toLowerCase())
      return coincideCategoria && coincideEstado && coincideBusqueda && item.activo
    })
  }, [state.lista, state.filtroCategoria, state.filtroEstado, state.busqueda])

  const estadisticas = useMemo(
    () => ({
      total: listaFiltrada.length,
      completadas: listaFiltrada.filter((i) => i.estado === 'completado').length,
      pegadas: listaFiltrada.filter((i) => i.atributos?.pegada).length,
      promedioRating:
        listaFiltrada.length > 0
          ? (
              listaFiltrada.reduce((sum, i) => sum + (i.puntuacion || 0), 0) /
              listaFiltrada.length
            ).toFixed(1)
          : 0,
    }),
    [listaFiltrada]
  )

  const datosActividad = useMemo(() => {
    const dias = []
    const hoy = new Date()
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() - i)
      const clave = fecha.toISOString().slice(0, 10)
      const etiqueta = fecha.toLocaleDateString('es-GT', {
        day: '2-digit',
        month: '2-digit',
      })
      dias.push({ clave, fecha: etiqueta, cantidad: 0 })
    }
    listaFiltrada.forEach((item) => {
      if (!item.fechaRegistro) return
      const clave = new Date(item.fechaRegistro).toISOString().slice(0, 10)
      const dia = dias.find((d) => d.clave === clave)
      if (dia) dia.cantidad += 1
    })
    return dias.map(({ fecha, cantidad }) => ({ fecha, cantidad }))
  }, [listaFiltrada])

  const datosCategoria = useMemo(() => {
    return CATEGORIAS.map((cat) => ({
      nombre: cat.nombre,
      color: cat.color,
      cantidad: listaFiltrada.filter((item) => item.categoriaId === cat.id).length,
    })).filter((d) => d.cantidad > 0)
  }, [listaFiltrada])

  const datosOriginal = useMemo(() => {
    const conteo = {}
    listaFiltrada.forEach((item) => {
      const seleccion = item.atributos?.seleccion
      if (!seleccion) return
      conteo[seleccion] = (conteo[seleccion] || 0) + 1
    })
    return Object.entries(conteo)
      .map(([seleccion, cantidad]) => ({ seleccion, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5)
  }, [listaFiltrada])

  const handleEliminar = useCallback(
    async (id) => {
      dispatch({ type: 'ELIMINAR', payload: id })
      await eliminarItem(id)
    },
    [eliminarItem]
  )

  // Items activos (no archivados) usados por el hook de progreso del album
  const itemsActivos = useMemo(
    () => state.lista.filter((item) => item.activo),
    [state.lista]
  )
  const progreso = useProgreso(itemsActivos)

  return (
    <div>
      <div className="controles-superiores">
        <select
          className="selector-modo"
          value={modo}
          onChange={(e) => setModo(e.target.value)}
          aria-label="Modo de almacenamiento"
        >
          <option value="local">Modo Local</option>
          <option value="api">Modo API</option>
        </select>

        <button
          className="toggle-tema"
          data-tema={tema}
          onClick={toggleTema}
          aria-label={tema === 'claro' ? 'Activar tema oscuro' : 'Activar tema claro'}
        >
          <span className="toggle-knob" />
          <FaSun className="icono-sol" />
          <FaMoon className="icono-luna" />
        </button>
      </div>

      <h1>Albúm Copa Mundial de Fútbol 2026</h1>

      {/* RF-06: input del nombre del usuario, persistido en localStorage */}
      <div className="perfil-usuario">
        <label htmlFor="input-nombre-usuario">Tu nombre:</label>
        <input
          id="input-nombre-usuario"
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          placeholder="Escribe tu nombre"
        />
      </div>

      {/* RF-06: saludo dinamico con reloj en tiempo real */}
      <p className="saludo-dinamico">{saludo} · {horaTexto}</p>

      {/* RF-02: banner visible cuando una llamada al backend falla.
          El usuario puede cerrarlo y seguir trabajando en modo Local. */}
      {error && (
        <div className="banner-error" role="alert">
          <span>{error}</span>
          <button onClick={limpiarError} aria-label="Cerrar mensaje de error">×</button>
        </div>
      )}

      <p className="indicador-progreso">
        Colección: {progreso.totalColectadas} estampas · {progreso.porcentaje}% del álbum
        {progreso.rachaActual > 0 && ` · racha de ${progreso.rachaActual} completadas`}
      </p>

      <EstadisticasResumen estadisticas={estadisticas} />

      <Formulario ref={nombreRef} onGuardado={recargar} />

      <BarraFiltros
        filtroCategoria={filtroCategoria}
        filtroEstado={filtroEstado}
        busqueda={busqueda}
        dispatch={dispatch}
      />

      <Coleccion
        items={listaFiltrada}
        onCambio={recargar}
        onEliminar={handleEliminar}
      />

      <PanelGraficas
        datosActividad={datosActividad}
        datosCategoria={datosCategoria}
        datosOriginal={datosOriginal}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <StorageProvider>
        <Contenido />
      </StorageProvider>
    </ThemeProvider>
  )
}

export default App
