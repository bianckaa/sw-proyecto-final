import { useEffect, useState } from 'react'
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
          <Bar dataKey="cantidad" name="Estampas" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaOriginal
