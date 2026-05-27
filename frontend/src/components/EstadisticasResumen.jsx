function EstadisticasResumen({ estadisticas }) {
  const tarjetas = [
    { etiqueta: 'Total estampas', valor: estadisticas.total, color: 'var(--color-primary)' },
    { etiqueta: 'Completadas', valor: estadisticas.completadas, color: 'var(--color-success)' },
    { etiqueta: 'Pegadas en álbum', valor: estadisticas.pegadas, color: 'var(--color-accent)' },
    { etiqueta: 'Promedio rating', valor: estadisticas.promedioRating, color: 'var(--color-warn)' },
  ]

  return (
    <div className="estadisticas-resumen">
      {tarjetas.map((t) => (
        <div key={t.etiqueta} className="tarjeta-estadistica" style={{ borderTop: `4px solid ${t.color}` }}>
          <span className="tarjeta-valor" style={{ color: t.color }}>{t.valor}</span>
          <span className="tarjeta-etiqueta">{t.etiqueta}</span>
        </div>
      ))}
    </div>
  )
}

export default EstadisticasResumen
