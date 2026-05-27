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

function GraficaActividad({ datos }) {
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
          <Bar dataKey="cantidad" name="Estampas registradas" fill="#1B4FBB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaActividad
