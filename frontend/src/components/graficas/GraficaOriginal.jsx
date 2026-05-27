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

function GraficaOriginal({ datos }) {
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
          <Bar dataKey="cantidad" name="Estampas" fill="#E8192C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaOriginal
