import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function GraficaCategoria({ datos }) {
  return (
    <div className="grafica">
      <h3>Distribución por categoría</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={datos}
            dataKey="cantidad"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {datos.map((d) => (
              <Cell key={d.nombre} fill={d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(valor, nombre) => [`${valor} estampas`, nombre]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaCategoria
