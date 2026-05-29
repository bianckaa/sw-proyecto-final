import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

const CLAVE_TEMA = 'tema'

export function ThemeProvider({ children }) {
  // useLocalStorage reemplaza el patron useState + useEffect de persistencia
  const [tema, setTema] = useLocalStorage(CLAVE_TEMA, 'claro')

  // Refleja el tema en el body para que las variables CSS cambien
  useEffect(() => {
    document.body.setAttribute('data-theme', tema)
  }, [tema])

  const toggleTema = () => {
    setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro'))
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
