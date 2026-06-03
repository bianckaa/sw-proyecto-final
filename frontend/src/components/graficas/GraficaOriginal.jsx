<<<<<<< HEAD
=======
import { useEffect, useState } from 'react'
>>>>>>> main
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
<<<<<<< HEAD

function GraficaOriginal({ datos }) {
=======
import { useTheme } from '../../context/ThemeProvider'

function GraficaOriginal({ datos }) {
  // Leemos el color de las variables CSS para que responda al cambio de tema.
  const { tema } = useTheme()
  const [color, setColor] = useState('#E8192C')

  useEffect(() => {
    const valor = getComputedStyle(document.body)
      .getPropertyValue('--color-grafica-2')
      .trim()
    if (valor) setColor(valor)
  }, [tema])

>>>>>>> main
  return (
    <div className="grafica">
      <h3>Top 5 selecciones en mi colección</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={datos} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="seleccion" width={120} />
          <Tooltip />
          <Legend />
<<<<<<< HEAD
          <Bar dataKey="cantidad" name="Estampas" fill="#E8192C" />
=======
          <Bar dataKey="cantidad" name="Estampas" fill={color} />
>>>>>>> main
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaOriginal
