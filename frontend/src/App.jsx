import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  return <div><h1>Estampas del Mundial 2026</h1></div>
}

export default App