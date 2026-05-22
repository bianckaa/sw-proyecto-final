import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const CLAVE_TEMA = 'tema'

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(
    () => localStorage.getItem(CLAVE_TEMA) || 'claro'
  )

  // Persiste el tema y lo refleja en el body para que las variables CSS cambien
  useEffect(() => {
    localStorage.setItem(CLAVE_TEMA, tema)
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
