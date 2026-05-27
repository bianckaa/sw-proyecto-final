import { useState, useEffect, useRef } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import './App.css'
import Formulario from './components/Formulario'
import Coleccion from './components/Coleccion'
import { StorageProvider, useStorage } from './context/StorageProvider'
import { ThemeProvider, useTheme } from './context/ThemeProvider'

function Contenido() {
  const { modo, setModo, obtenerItems } = useStorage()
  const { tema, toggleTema } = useTheme()
  const [items, setItems] = useState([])

  // Decisión: la ref del input nombre se crea aquí (nivel App) y se pasa a
  // Formulario por forwardRef. Así un mismo nodo sirve para el focus tras
  // guardar (dentro de Formulario) y para el atajo Ctrl+N (aquí en App),
  // sin necesidad de un contexto extra.
  const nombreRef = useRef(null)

  const recargar = async () => {
    const data = await obtenerItems()
    setItems(data)
  }

  useEffect(() => {
    recargar()
  }, [modo])

  // Atajos de teclado: Ctrl+N enfoca el input nombre, "t" alterna el tema
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        nombreRef.current?.focus()
      }
      if (e.key === 't' && !e.ctrlKey && !e.altKey) {
        toggleTema()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleTema])

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

      <Formulario ref={nombreRef} onGuardado={recargar} />

      <hr className="divisor-secciones" />

      <Coleccion items={items} onCambio={recargar} />
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
