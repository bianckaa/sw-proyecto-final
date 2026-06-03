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

function GraficaActividad({ datos }) {
=======
import { useTheme } from '../../context/ThemeProvider'

function GraficaActividad({ datos }) {
  // Leemos el color de las variables CSS para que responda al cambio de tema.
  // tema es la dependencia: cuando cambia, recalculamos el color.
  const { tema } = useTheme()
  const [color, setColor] = useState('#1B4FBB')

  useEffect(() => {
    const valor = getComputedStyle(document.body)
      .getPropertyValue('--color-grafica-1')
      .trim()
    if (valor) setColor(valor)
  }, [tema])

>>>>>>> main
  return (
    <div className="grafica">
      <h3>Actividad últimos 7 días</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
<<<<<<< HEAD
          <Bar dataKey="cantidad" name="Estampas registradas" fill="#1B4FBB" />
=======
          <Bar dataKey="cantidad" name="Estampas registradas" fill={color} />
>>>>>>> main
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaActividad
